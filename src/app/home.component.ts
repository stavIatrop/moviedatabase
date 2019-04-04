import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent { 

  constructor(private router : Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {

                this.searchForm = formBuilder.group ( {
                  searchWords: ""
                });
              }

  searchForm;

  userLoggedIn;
  user = {

    _id : '',
    username: '',
    password: '',
    review_count : Number
  }
  ngOnInit() {

    if(sessionStorage.user) {

      this.userLoggedIn = 1;
      this.user = JSON.parse(sessionStorage.getItem("user")) ;
      console.log(this.user);
    }
  }

  // onSubmit() {
    
  //   console.log(this.searchForm.value.searchWords);
  //   sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
  //   this.router.navigate(["/search"]);
  // }

  signout() {
    console.log("e2e");
    sessionStorage.removeItem("user");
    window.location.reload();
  }

  search() {
    console.log("hey");
  }

}
