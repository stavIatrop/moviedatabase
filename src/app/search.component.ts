import { Component } from '@angular/core';
import { WebService } from './web.service';
import { Router} from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

    constructor(private webService: WebService,
                private formBuilder: FormBuilder,
                private router: Router){

                    this.searchForm = formBuilder.group ( {
                        searchWords: ""
                });
    }

    searchForm;
        
    ngOnInit() {

        this.webService.getResults();
        
    }

    onSubmit() {
    
        console.log(this.searchForm.value.searchWords);
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.webService.getResults();    
    }

    nextPageSearch() {

      this.start = Number(this.start) + this.webService.searchRes_per_page;
      if(this.webService.numberOfResults > this.start) {
        sessionStorage.startRes = Number(this.start);
        this.webService.getSliceOfSearch(Number(this.start));
      }else {
        this.start = Number(this.start) - this.webService.searchRes_per_page;
      }

    }

    previousPageSearch() {
      if(this.start > 0) {
        this.start = Number(this.start) - this.webService.searchRes_per_page;
        sessionStorage.startRes = Number(this.start);
        this.webService.getSliceOfSearch(this.start);
      }
    }

    getPageSearch(page) {

      this.start = (page) * this.webService.searchRes_per_page;
      sessionStorage.startRes = Number(this.start);
      this.webService.getSliceOfSearch(this.start);
    }

    firstPageSearch() {
      this.start = 0;
      sessionStorage.startRes = Number(this.start);
      this.webService.getSliceOfSearch(this.start);
    }

    lastPageSearch() {

      this.start = this.webService.numberOfResults - this.webService.searchRes_per_page;
      sessionStorage.startRes = Number(this.start);
      this.webService.getSliceOfSearch(this.start);
    }

    start = 0;
}