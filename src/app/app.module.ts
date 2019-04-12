import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularPaginatorModule } from 'angular-paginator';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies.component';
import { WebService } from './web.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';

import { HomeComponent } from './home.component';
import { MovieComponent } from './movie.component';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './signup.component';
import { UnderConstructionComponent } from './underConstruction.component';
import { NavComponent } from './nav.component';
import { SearchComponent } from './search.component';
import { AddMovieComponent } from './addMovie.component';
import { FooterComponent } from './foot.component';
import { EditMovieComponent } from './editMovie.component';
import { ProfileComponent } from './profile.component';

var routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'movies/:id',
    component: MovieComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'underConstruction',
    component: UnderConstructionComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'addMovie',
    component: AddMovieComponent
  },
  {
    path: 'editMovie',
    component: EditMovieComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent
  }


];

@NgModule({
  declarations: [
    AppComponent, MoviesComponent, HomeComponent,
    MovieComponent, LoginComponent, SignUpComponent, UnderConstructionComponent, CallbackComponent, NavComponent,
    SearchComponent, AddMovieComponent, FooterComponent, EditMovieComponent, ProfileComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule, AngularFontAwesomeModule, AngularPaginatorModule, NgbModule.forRoot()
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
