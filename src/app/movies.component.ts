import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

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

    constructor(private webService: WebService,
                private authService: AuthService) {}

    // async ngOnInit() {
    //     var response = await this.webService.getMovies();
    //     this.movie_list = response.json();
    // }

    ngOnInit() {
      if (sessionStorage.start) {
        this.start = sessionStorage.start;
      }
      console.log(this.start);
      this.webService.getMovies(this.start);
      this.webService.getPageCount();

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

    firstPage() {
      this.start = 0;
      sessionStorage.start = Number(this.start);
      this.webService.getMovies(this.start);
    }

    lastPage() {

      this.start = this.webService.movies_count - this.webService.movies_per_page;
      sessionStorage.start = Number(this.start);
      this.webService.getMovies(this.start);
    }

    getPage(page) {
      console.log(page);
      this.start = (page) * this.webService.movies_per_page;
      sessionStorage.start = Number(this.start);
      this.webService.getMovies(this.start);
    }

    start = 0;
}