import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from './web.service';
import { MovieComponent } from './movie.component';

@Component({
    selector: 'addMovie',
    templateUrl: './addMovie.component.html',
    styleUrls: ['./addMovie.component.css']
  })

export class AddMovieComponent {

    constructor(private router : Router,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private webService: WebService) {

                  this.searchForm = formBuilder.group ( {
                      searchWords: ""
                    });

                  this.movieForm = formBuilder.group( {
                    title: ['', Validators.required],
                    year: ['', Validators.required],
                    cast : [String],
                    genres : [String],
                    description : ''

                  })
                }
            
    searchForm;
    movieForm;

    movie = {
      title: '',
      description: '',
      cast: [],
      genres: [],
      year: ''
    }


    ngOnInit() {

      this.webService.fillYearArray();
    }

    onSubmit() {
    
        console.log(this.searchForm.value.searchWords);
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.router.navigate(["/search"]);
    }

    onSubmitMovie() {

      var cast = this.movieForm.value.cast.split(/[,]/);
      
      for(var i = 0; i < cast.length;  i++) {
        cast[i] = cast[i].trim();
      }
      cast = cast.filter(Boolean);
      
      var genres = this.movieForm.value.genres.split(/[,]/);
      
      for(var i = 0; i < genres.length;  i++) {
        genres[i] = genres[i].trim();
      }
      genres = genres.filter(Boolean);
      
      this.webService.postMovie(this.movieForm.value, cast, genres);

      this.movieForm.reset();
      
    }

    isInvalid(control) {
      return this.movieForm.controls[control].invalid &&
              this.movieForm.controls[control].touched
    }

    isIncomplete() {

      
      return (this.isInvalid('title') ||
              this.isInvalid('year') || this.movieForm.value.title == "" || this.movieForm.value.year == "");
    }


    @HostListener('window:scroll') onScroll() {
      
      this.scrollFunction();
    }
    scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("toTop").style.display = "block";
      } else {
        document.getElementById("toTop").style.display = "none";
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    topFunction() {
        
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


}
  