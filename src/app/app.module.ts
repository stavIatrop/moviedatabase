import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BusinessesComponent } from './businesses.component';
import { WebService } from './web.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent, BusinessesComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
