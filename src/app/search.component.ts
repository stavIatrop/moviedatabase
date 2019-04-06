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
        
    selectedOptionView = "0";
    selectedOptionSort = "0";

    onChangeView() {
      console.log(this.selectedOptionView);
      this.start = 0;
      if(this.selectedOptionView == "All") {

        this.webService.searchRes_per_page = this.webService.numberOfResults;
        this.webService.page_countSearch = 1;
        this.webService.pagesSearch = Array(this.webService.page_countSearch).fill(0).map((x,i)=>i);
        this.webService.getSliceOfSearch(this.start);
        return;

      }else if(parseInt(this.selectedOptionView) != 0) {
        this.webService.searchRes_per_page = parseInt(this.selectedOptionView);

      }else {
        //default view 5
        this.webService.searchRes_per_page = 5;
        
      }

      if( this.webService.numberOfResults % this.webService.searchRes_per_page == 0) {

        this.webService.page_countSearch = this.webService.numberOfResults / this.webService.searchRes_per_page;

      }else {

        this.webService.page_countSearch = Math.floor(parseInt(this.webService.numberOfResults) / this.webService.searchRes_per_page) + 1;

      }
      this.webService.pagesSearch = Array(this.webService.page_countSearch).fill(0).map((x,i)=>i);
      this.webService.getSliceOfSearch(this.start);
      
      
    }

    onChangeSort() {
      console.log(this.selectedOptionSort);

      if(this.selectedOptionSort == "relevance") {
        
      }
      
    }

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
        var page;
      
        page = (Number(this.start - this.webService.searchRes_per_page ) / this.webService.searchRes_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";
  
      }else {
        this.start = Number(this.start) - this.webService.searchRes_per_page;
      }

     
      page = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

    }

    previousPageSearch() {

      if(this.start > 0) {

        var page;
      
        page = (Number(this.start  ) / this.webService.searchRes_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";

        this.start = Number(this.start) - this.webService.searchRes_per_page;

        page = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

        pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "#132f47";
        document.getElementById(pageString).style.color = "white";

        sessionStorage.startRes = Number(this.start);
        this.webService.getSliceOfSearch(this.start);
      }
    }

    getPageSearch(page) {

      var page1;
      
      page1 = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      var pageString = "pageButton" + page1.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      pageString = "pageButton" + (page + 1).toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      this.start = (page) * this.webService.searchRes_per_page;
      sessionStorage.startRes = Number(this.start);
      this.webService.getSliceOfSearch(this.start);
    }

    firstPageSearch() {


      var page;
      
      page = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      this.start = 0;
      sessionStorage.startRes = Number(this.start);
      this.webService.getSliceOfSearch(this.start);
    }

    lastPageSearch() {

      var page;

      page = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      this.start = (this.webService.page_countSearch - 1) * this.webService.searchRes_per_page;

      console.log(this.start);

      page = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      
      sessionStorage.startRes = Number(this.start);
      this.webService.getSliceOfSearch(this.start);
    }

    start = 0;
}