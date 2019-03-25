import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
    // business_list = [
    //     { "name": "Pizza Place",
    //         "city": "Coleriane",
    //         "review_count": 10 },
    //     { "name": "Wine Lake",
    //         "city": "Ballymoney",
    //         "review_count": 7 },
    //     { "name": "Beer Tavern",
    //         "city": "Ballymena",
    //         "review_count": 12 }
    // ];

    constructor(private webService: WebService) {}

    // async ngOnInit() {
    //     var response = await this.webService.getMovies();
    //     this.movie_list = response.json();
    // }

    ngOnInit() {
      if (sessionStorage.start) {
        this.start = sessionStorage.start;
      }
      this.webService.getMovies(this.start);
      this.webService.getMoviesCount();
      // this.webService.movie_list
      //     .subscribe(movies => {
      //         this.movie_list = movies
      //     })
    }

    nextPage() {
      this.start = Number(this.start) + 5;
      if(this.webService.movies_count > this.start) {
        sessionStorage.start = Number(this.start);
        this.webService.getMovies(this.start);
      }
      
    }

    previousPage() {
      if(this.start > 0) {
        this.start = Number(this.start) - 5;
        sessionStorage.start = Number(this.start);
        this.webService.getMovies(this.start);
      }
    }

    start = 0;
}