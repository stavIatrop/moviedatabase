import { Component } from '@angular/core';

@Component({
  selector: 'underConstruction',
  templateUrl: './underConstruction.component.html',
  styleUrls: ['./underConstruction.component.css']
})

export class UnderConstructionComponent {

  ngOnInit() {
    if(sessionStorage.movieEdit) {
      sessionStorage.removeItem("movieEdit");
    }
  }
}