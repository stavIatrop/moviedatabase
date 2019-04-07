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

    numberOfResults;
    searchRes_per_page = 5;
    page_countSearch;
    pagesSearch = [];

    constructor(private http: Http,
                private router: Router) {}

    getMovies(start, sort) {
        return this.http.get(
            'http://localhost:3000/api/movies?start=' + start + "&number=" + this.movies_per_page + "&sort=" + sort)
            .subscribe(response => {
                
                this.movie_private_list = response.json();
                this.moviesSubject.next(this.movie_private_list);

                this.getMoviesCount();


            })
    }

    movieID;
    getMovie(id) {
        return this.http.get(
            'http://localhost:3000/api/movies/' + id)
            .subscribe(response => {
                this.movie_private_list = [];
                this.movie_private_list.push(response.json());
                this.moviesSubject.next(this.movie_private_list);
                console.log(this.movie_private_list[0].review_count);
                this.movieID = id;
                this.review_count = this.movie_private_list[0].review_count;
                this.getReviews(id, 0, this.reviews_per_page);
                // this.review_count = this.movie_private_list[0].review_count;
            
                // if( this.review_count % this.reviews_per_page == 0) {
                //     this.page_countReviews = parseInt(this.review_count) / this.reviews_per_page;
                // }else {
                //     this.page_countReviews = Math.floor(parseInt(this.review_count) / this.reviews_per_page) + 1;
                // }
                // console.log(this.page_countReviews)
                // this.pagesReviews = Array(this.page_countReviews).fill(0).map((x,i)=>i);
            })
    }
    
    getMoviesCount() {
        return this.http.get(
            'http://localhost:3000/api/moviesCount')
            .subscribe(response => {
                this.movies_count = response.json();

                if( this.movies_count % this.movies_per_page == 0) {
                    this.page_count = parseInt(this.movies_count) / this.movies_per_page;
                }else {
                    this.page_count = Math.floor(parseInt(this.movies_count) / this.movies_per_page) + 1;
                }

                this.pages = Array(this.page_count).fill(0).map((x,i)=>i);
                
            })
        
    }

    // getPageCount() {

    //     this.getMoviesCount();
    // }

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
                                
                                
                            }
                        }
                    )
    }

    
    noReviews = true;
    getReviews(id, start, sort) {
        
        this.http.get (
                'http://localhost:3000/api/movies/' + id + '/reviews' + "?start=" + start + "&number=" + this.reviews_per_page + "&sort=" + sort )
        .subscribe(
            response => {

                
                console.log(this.review_count);
                
                if( this.review_count == 0) {
                    this.noReviews = true;
                    
                    return;
                }else {
                    this.noReviews = false;

                }
                if( this.review_count % this.reviews_per_page == 0) {
                    this.page_countReviews = parseInt(this.review_count) / this.reviews_per_page;
                }else {
                    this.page_countReviews = Math.floor(parseInt(this.review_count) / this.reviews_per_page) + 1;
                }
                console.log(this.page_countReviews)
                this.pagesReviews = Array(this.page_countReviews).fill(0).map((x,i)=>i);

                this.reviews_private_list = response.json();
                this.reviewsSubject.next(this.reviews_private_list);
                
                    
                
            }
        )
    }

    searchString;
    noResults;
    

    private searchResults_private_list = [];
    private searchSubject = new Subject();
    searchResults_list = this.searchSubject.asObservable();
    //searchResults_list = [];

    // getSliceOfSearch(start) {
        
    //     this.searchResults_list = this.searchResults_private_list.slice(start, start + this.searchRes_per_page);
    // }

    getResults(start, sort) {

        this.searchString = sessionStorage.getItem("searchString");
        console.log(this.searchString);
        if(this.searchString.length == 0) {
            console.log("No results");
            this.noResults = true;
            return;
        }
        return this.http.get(
            'http://localhost:3000/api/search?searchString=' + this.searchString + "&start=" + start + "&perPage=" + this.searchRes_per_page + "&sort=" + sort)
            .subscribe(
                response => {

                    
                    var res = response.json();
                    this.numberOfResults = res[0].numberOfResults;
                    this.searchResults_private_list = res[0].docs2;

                    if(this.searchResults_private_list.length == 0) {
                        this.noResults = true;
                        return;

                    }else {

                        this.noResults = false;
                        
                    }
                    
                    
                    if( this.numberOfResults % this.searchRes_per_page == 0) {
                        this.page_countSearch = this.numberOfResults / this.searchRes_per_page;
                    }else {
                        this.page_countSearch = Math.floor(parseInt(this.numberOfResults) / this.searchRes_per_page) + 1;
                    }
                    console.log(this.page_countSearch);
                    console.log(this.searchRes_per_page);
                    console.log(this.numberOfResults);

                    this.pagesSearch = Array(this.page_countSearch).fill(0).map((x,i)=>i);

                    setTimeout( () => { this.searchSubject.next(this.searchResults_private_list); }, 200 );
                    

                    console.log(this.searchResults_private_list);

                    

                    
                }
            )
    }

    postReview(review, sort) {

        
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', review.name);
        urlSearchParams.append('text', review.review);
        urlSearchParams.append('stars', review.stars);

        this.http.post("http://localhost:3000/api/movies/" +
                    review.movieID + "/reviews", urlSearchParams)
                    .subscribe(
                        response => {
                            this.review_count = this.review_count + 1;
                            this.getReviews(review.movieID, 0, sort);
                        }
        )
            


    }
    // sortByRelevance() {

    //     this.searchResults_list = this.searchResults_private_list;
    //     this.searchResults_list.sort(function(a, b) {
    //         return b.relevance - a.relevance;
    //     })
        

    //     if(this.searchRes_per_page <= this.searchResults_list.length) {
    //         this.searchResults_list = this.searchResults_list.slice(0, this.searchRes_per_page);
    //     } else {
    //         this.searchResults_list = this.searchResults_list.slice(0, this.searchResults_list.length);
    //     }

    //     console.log(this.searchResults_list);
    // }

    // compare(a,b) {
    //     if (a.last_nom < b.last_nom)
    //       return -1;
    //     if (a.last_nom > b.last_nom)
    //       return 1;
    //     return 0;
    //   }

    // sortByTitle() {
    
    //     this.searchResults_list = this.searchResults_private_list;
        
    //     this.searchResults_list.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); 

    //     if(this.searchRes_per_page <= this.searchResults_list.length) {
    //         this.searchResults_list = this.searchResults_list.slice(0, this.searchRes_per_page);
    //     } else {
    //         this.searchResults_list = this.searchResults_list.slice(0, this.searchResults_list.length);
    //     }

    //     console.log(this.searchResults_list);
    // }

    // sortByYear() {

    //     this.searchResults_list = this.searchResults_private_list;
    //     this.searchResults_list.sort(function(a, b) {
            
    //         return b.year - a.year;
    //     })
        

    //     if(this.searchRes_per_page <= this.searchResults_list.length) {
    //         this.searchResults_list = this.searchResults_list.slice(0, this.searchRes_per_page);
    //     } else {
    //         this.searchResults_list = this.searchResults_list.slice(0, this.searchResults_list.length);
    //     }

    //     console.log(this.searchResults_list);
    // }

   
}