import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'editMovie',
  templateUrl: './editMovie.component.html',
  styleUrls: ['./editMovie.component.css']
})

export class EditMovieComponent {

    constructor(private webService: WebService,
            private route: ActivatedRoute,
            private formBuilder: FormBuilder,
            private authService: AuthService,
            private router : Router) {

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

    movieEdit;

    movie = {
        title: '',
        description: '',
        cast: [],
        genres: [],
        year: ''
    }

    ngOnInit() {

        this.webService.fillYearArray();
        
        if(sessionStorage.movieEdit) {

            this.movieEdit = JSON.parse(sessionStorage.getItem("movieEdit"));
            this.movie.title = this.movieEdit.title;
            this.movie.year = this.movieEdit.year;
            this.movie.cast = this.movieEdit.cast;
            this.movie.description = this.movieEdit.description;
            this.movie.genres = this.movieEdit.genres;



        }else {
            this.router.navigate(["/"]);
        }

    }

    onSubmit() {
    
        console.log(this.searchForm.value.searchWords);
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.router.navigate(["/search"]);
    }

    onUpdateMovie() {

        
        var cast = this.movieForm.value.cast.toString();
        
        cast = cast.split(/[,]/);
      
        for(var i = 0; i < cast.length;  i++) {
            cast[i] = cast[i].trim();
        }
        cast = cast.filter(Boolean);
        
        var genres = this.movieForm.value.genres.toString();
        genres = genres.split(/[,]/);
        
        for(var i = 0; i < genres.length;  i++) {
            genres[i] = genres[i].trim();
        }
        genres = genres.filter(Boolean);
        
        this.movieForm.value.cast = cast;
        this.movieForm.value.genres = genres;
        
        this.webService.updateMovie(this.movieEdit._id, this.movieForm.value);

    }

    onChange() {
      document.getElementById("saved").style.display = "none";
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