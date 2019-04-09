import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';

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
                }
            
    searchForm;

    ngOnInit() {

    }

    onSubmit() {
    
        console.log(this.searchForm.value.searchWords);
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.router.navigate(["/search"]);
      }
}
  