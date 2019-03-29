import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent { 

  loginForm;

  user = {
    username: '',
    password: ''
  }

  constructor(private webService: WebService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

                
              }

  ngOnInit() {


  }

  login() {
    console.log(this.user.username + " " + this.user.password);
    
    if(this.user.username != '' && this.user.password != '') {

      console.log(this.webService.checkUserAuth(this.user.username, this.user.password));

    }
  }

}