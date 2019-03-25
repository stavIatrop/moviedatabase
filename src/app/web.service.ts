import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class WebService {

    private movie_private_list = [];
    private moviesSubject = new Subject();
    movie_list = this.moviesSubject.asObservable();

    movies_count;

    constructor(private http: Http) {}

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
            })
        
    }
}