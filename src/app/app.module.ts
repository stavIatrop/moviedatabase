import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies.component';
import { WebService } from './web.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';
import { MovieComponent } from './movie.component';


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
  }
];

@NgModule({
  declarations: [
    AppComponent, MoviesComponent, HomeComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(routes)
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
