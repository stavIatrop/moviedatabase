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
}