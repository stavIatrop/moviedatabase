import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {

    constructor(private webService: WebService,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router) {

                  this.searchForm = formBuilder.group ( {
                    searchWords: ""
                  });
                }

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

    searchForm;

    onSubmit() {
    
      console.log(this.searchForm.value.searchWords);
      sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
      this.router.navigate(["/search"]);
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