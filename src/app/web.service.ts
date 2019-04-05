import { Http, URLSearchParams } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Router} from '@angular/router';

@Injectable()
export class WebService {

    private movie_private_list = [];
    private moviesSubject = new Subject();
    movie_list = this.moviesSubject.asObservable();

    movies_count;
    movies_per_page = 5;
    page_count;
    pages = [];

    userAuth;
    
    user = {
        _id : '',
        username: '',
        password: '',
        review_count : Number
    };

    private reviews_private_list = [];
    private reviewsSubject = new Subject();
    reviews = this.reviewsSubject.asObservable();

    review_count;
    reviews_per_page = 5;
    page_countReviews;
    pagesReviews = [];

    constructor(private http: Http,
                private router: Router) {}

    getMovies(start) {
        return this.http.get(
            'http://localhost:3000/api/movies?start=' + start)
            .subscribe(response => {
                this.movie_private_list = response.json();
                this.moviesSubject.next(this.movie_private_list);
            })
    }

    getMovie(id) {
        return this.http.get(
            'http://localhost:3000/api/movies/' + id)
            .subscribe(response => {
                this.movie_private_list = [];
                this.movie_private_list.push(response.json());
                this.moviesSubject.next(this.movie_private_list);
                console.log(this.movie_private_list[0].review_count);
                this.review_count = this.movie_private_list[0].review_count;
            
                if( this.review_count % this.reviews_per_page == 0) {
                    this.page_countReviews = parseInt(this.review_count) / this.reviews_per_page;
                }else {
                    this.page_countReviews = Math.floor(parseInt(this.review_count) / this.reviews_per_page) + 1;
                }
                console.log(this.page_countReviews)
                this.pagesReviews = Array(this.page_countReviews).fill(0).map((x,i)=>i);
            })
    }
    
    getMoviesCount() {
        return this.http.get(
            'http://localhost:3000/api/moviesCount')
            .subscribe(response => {
                this.movies_count = response.json();
                if( this.movies_count % this.movies_per_page == 0) {
                    this.page_count = this.movies_count / this.movies_per_page;
                }else {
                    this.page_count =(this.movies_count / this.movies_per_page) + 1;
                }

                this.pages = Array(this.page_count).fill(0).map((x,i)=>i);
                
            })
        
    }

    getPageCount() {

        this.getMoviesCount();
    }

    checkUserAuth(username, password) {
        
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);

        this.http.post(
                    "http://localhost:3000/api/login", urlSearchParams)
                    .subscribe(
                        response => {
                            this.user = response.json();
                            
                            if(Object.keys(this.user).length != 0) {
                                
                                this.user = this.user[0];
                                sessionStorage.setItem("user", JSON.stringify(this.user));
                                this.router.navigate(["/"]);
                                
                                
                            }else {
                                console.log("null");
                            }
                        }
                    )
    }

    getReviews(id) {
        
        this.http.get (
                'http://localhost:3000/api/movies/' + id +
                '/reviews')
        .subscribe(
            response => {
                this.reviews_private_list = response.json();
                this.reviewsSubject.next(
                                    this.reviews_private_list);
                
            }
        )
    }

    searchString;
    noResults;
    numberOfResults;

    private searchResults_private_list = [];
    private searchSubject = new Subject();
    searchResults_list = this.searchSubject.asObservable();
    

    getResults() {

        this.searchString = sessionStorage.getItem("searchString");
        console.log(this.searchString);
        if(this.searchString.length == 0) {
            console.log("No results");
            this.noResults = true;
            return;
        }
        return this.http.get(
            'http://localhost:3000/api/search?searchString=' + this.searchString)
            .subscribe(
                response => {
                    this.searchResults_private_list = response.json();
                    this.searchSubject.next(this.searchResults_private_list);
                    this.numberOfResults = this.searchResults_private_list.length;
                    
                    if(this.searchResults_private_list.length == 0) {
                        this.noResults = true;
                    }else {
                        this.noResults = false;
                    }
                    
                }
            )
    }
}