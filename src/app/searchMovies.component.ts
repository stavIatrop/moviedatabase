import { Component } from '@angular/core';
import { WebService } from './web.service';
import { Router} from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'searchMovies',
  templateUrl: './searchMovies.component.html',
  styleUrls: ['./searchMovies.component.css']
})

export class SearchMoviesComponent{

    constructor(private webService: WebService){}


    ngOnInit() {
       
    }
}