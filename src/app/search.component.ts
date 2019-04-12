import { Component, HostListener } from '@angular/core';
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
                private router: Router,
                private authService: AuthService,){

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
      
      page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

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
        
        this.webService.getResults(this.start, this.selectedOptionSort);
        return;

      }else if(parseInt(this.selectedOptionView) != 0) {
        this.webService.searchRes_per_page = parseInt(this.selectedOptionView);
        this.webService.getResults(this.start, this.selectedOptionSort);

      }else {
        //default view 5
        this.webService.searchRes_per_page = 5;
        this.webService.getResults(this.start, this.selectedOptionSort);
        
      }      
      
    }

    onChangeSort() {
      console.log(this.selectedOptionSort);

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

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

      if(sessionStorage.movieEdit) {
        sessionStorage.removeItem("movieEdit");
      }

      this.webService.getResults(this.start, "default");
        
    }

    onSubmit() {
    
        var page;
        
        page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

        var pageString = "pageButton" + page.toString();
        if(document.getElementById(pageString) ) {

          document.getElementById(pageString).style.backgroundColor = "white";
          document.getElementById(pageString).style.color = "black";
        }
        
        console.log(this.searchForm.value.searchWords);
        
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.start = 0;
        this.webService.getResults(this.start, this.selectedOptionSort);    
    }

    nextPageSearch() {

      this.start = Number(this.start) + this.webService.searchRes_per_page;

      if(this.webService.numberOfResults > this.start) {
        sessionStorage.startRes = Number(this.start);

        var page;
      
        page = Math.ceil(Number(this.start - this.webService.searchRes_per_page ) / this.webService.searchRes_per_page) + 1 ;
  
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

     
      page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

    }

    previousPageSearch() {

      if(this.start > 0) {

        var page;
      
        page = Math.ceil(Number(this.start  ) / this.webService.searchRes_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";

        this.start = Number(this.start) - this.webService.searchRes_per_page;

        page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

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
      
      page1 = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

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
      
      page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

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

      page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      this.start = (this.webService.page_countSearch - 1) * this.webService.searchRes_per_page;

      console.log(this.start);

      page = Math.ceil(Number(this.start) / this.webService.searchRes_per_page) + 1 ;

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

    delete(movie) {
      
      console.log(this.start);
      if(this.start == this.webService.numberOfResults - 1) {
        this.start = Number(this.start) - this.webService.searchRes_per_page;
        if(this.start < 0) {
          this.start = Number(this.start) + this.webService.searchRes_per_page;
        }
      }
      this.webService.deleteMovieSearch( movie, this.start, this.selectedOptionSort);
    }

    edit(movie) {

      sessionStorage.setItem("movieEdit", JSON.stringify(movie));
      this.router.navigate(["/editMovie"]);

    }

    @HostListener('window:scroll') onScroll() {
      
      this.scrollFunction();
    }
    scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("toTop").style.display = "block";
      } else {
        document.getElementById("toTop").style.display = "none";
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    topFunction() {
        
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    
}