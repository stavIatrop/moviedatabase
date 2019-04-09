import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'addMovie',
    templateUrl: './addMovie.component.html',
    styleUrls: ['./addMovie.component.css']
  })

export class AddMovieComponent {

    constructor(private router : Router,
                private authService: AuthService,
                private formBuilder: FormBuilder) {

                  this.searchForm = formBuilder.group ( {
                      searchWords: ""
                    });

                  this.movieForm = formBuilder.group( {
                    title: ['', Validators.required],
                    year: [Number, Validators.required],
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
      year: Number
    }


    ngOnInit() {

    }

    onSubmit() {
    
        console.log(this.searchForm.value.searchWords);
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.router.navigate(["/search"]);
    }

    onSubmitMovie() {

      console.log(this.isInvalid('title'));
      console.log(this.movieForm.value.title);
      console.log(this.movieForm.value.year);
      console.log(this.movieForm.value.description);
      console.log(this.movieForm.value.cast);
      console.log(this.movieForm.value.genres);


      console.log(this.isInvalid('year'));
    }

    isInvalid(control) {
      return this.movieForm.controls[control].invalid &&
              this.movieForm.controls[control].touched
    }

    isIncomplete() {
      return (this.isInvalid('title') ||
              this.isInvalid('year'));
    }


}
  