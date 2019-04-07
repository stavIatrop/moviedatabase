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

    start = 0;

    onChangeView() {

      console.log(this.selectedOptionView);

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
      
      if(this.selectedOptionView == "All") {

        this.webService.searchRes_per_page = this.webService.numberOfResults;
        
        this.webService.getResults(this.start, "default");
        return;

      }else if(parseInt(this.selectedOptionView) != 0) {
        this.webService.searchRes_per_page = parseInt(this.selectedOptionView);
        this.webService.getResults(this.start, "default");

      }else {
        //default view 5
        this.webService.searchRes_per_page = 5;
        this.webService.getResults(this.start, "default");
        
      }      
      
    }

    onChangeSort() {
      console.log(this.selectedOptionSort);

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

      if(this.selectedOptionSort == "0") {

        this.webService.getResults(this.start, "default");

      }else {

        this.webService.getResults(this.start, this.selectedOptionSort);

      }
            
    }

    ngOnInit() {

        this.webService.getResults(this.start, "default");
        
    }

    onSubmit() {
    
        var page;
        
        page = (Number(this.start) / this.webService.searchRes_per_page) + 1 ;

        var pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";
        console.log(this.searchForm.value.searchWords);
        
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.start = 0;
        this.webService.getResults(this.start, "default");    
    }

    nextPageSearch() {

      this.start = Number(this.start) + this.webService.searchRes_per_page;

      if(this.webService.numberOfResults > this.start) {
        sessionStorage.startRes = Number(this.start);

        var page;
      
        page = (Number(this.start - this.webService.searchRes_per_page ) / this.webService.searchRes_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";

        if(this.selectedOptionSort == "0") {

          this.webService.getResults(this.start, "default");
        }else 
        {
          this.webService.getResults(this.start, this.selectedOptionSort)
        }
        
        
  
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
        
        if(this.selectedOptionSort == "0") {

          this.webService.getResults(this.start, "default");
        }else 
        {
          this.webService.getResults(this.start, this.selectedOptionSort)
        }

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
      
      if(this.selectedOptionSort == "0") {

        this.webService.getResults(this.start, "default");
      }else 
      {
        this.webService.getResults(this.start, this.selectedOptionSort)
      }

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
     
      if(this.selectedOptionSort == "0") {

        this.webService.getResults(this.start, "default");
      }else 
      {
        this.webService.getResults(this.start, this.selectedOptionSort)
      }

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
      
      if(this.selectedOptionSort == "0") {

        this.webService.getResults(this.start, "default");
      }else 
      {
        this.webService.getResults(this.start, this.selectedOptionSort)
      }
    }

    
}