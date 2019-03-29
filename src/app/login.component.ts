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
    password: '',
  }

  constructor(private webService: WebService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

                
              }

  ngOnInit() {


  }

  login() {
    
    
    if(this.user.username != '' && this.user.password != '') {

      this.webService.checkUserAuth(this.user.username, this.user.password);
      

    }
  }

}