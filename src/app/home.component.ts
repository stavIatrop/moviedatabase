import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent { 


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
      this.user = sessionStorage.user;
      console.log(this.user.username);
    }
  }

}
