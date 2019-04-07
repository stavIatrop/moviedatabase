import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {

    constructor(private webService: WebService,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router) {

                  this.searchForm = formBuilder.group ( {
                    searchWords: ""
                  });
                }

    // async ngOnInit() {
    //     var response = await this.webService.getMovies();
    //     this.movie_list = response.json();
    // }

    ngOnInit() {
      if (sessionStorage.start) {
        this.start = sessionStorage.start;
      }
      console.log(this.start);
      this.webService.getMovies(this.start , "default");
      //this.webService.getMoviesCount();

      // this.webService.movie_list
      //     .subscribe(movies => {
      //         this.movie_list = movies
      //     })
    }

    searchForm;

    selectedOptionView = "0";
    selectedOptionSort = "0";

    onChangeView() {

      console.log(this.selectedOptionView);

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      this.start = 0;
      
      if(this.selectedOptionView == "All") {

        this.webService.movies_per_page = this.webService.movies_count;
        
        this.webService.getMovies(this.start, this.selectedOptionSort);
        return;

      }else if(parseInt(this.selectedOptionView) != 0) {
        this.webService.movies_per_page = parseInt(this.selectedOptionView);
        this.webService.getMovies(this.start, this.selectedOptionSort);

      }else {
        //default view 5
        this.webService.movies_per_page = 5;
        this.webService.getMovies(this.start, this.selectedOptionSort);
        
      }
    }

    onChangeSort() {

      console.log(this.selectedOptionSort);

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      this.start = 0;

      if(this.selectedOptionSort == "0") {

        this.webService.getMovies(this.start, "default");

      }else {

        this.webService.getMovies(this.start, this.selectedOptionSort);

      }
    }


    onSubmit() {
    
      console.log(this.searchForm.value.searchWords);
      sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
      this.router.navigate(["/search"]);
    }

    nextPage() {
      this.start = Number(this.start) + 5;
      if(this.webService.movies_count > this.start) {
        sessionStorage.start = Number(this.start);

        var page;
      
        page = Math.ceil(Number(this.start - this.webService.movies_per_page ) / this.webService.movies_per_page) + 1 ;

        var pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";

        if(this.selectedOptionSort == "0") {

          this.webService.getMovies(this.start, "default");
        }else 
        {
          this.webService.getMovies(this.start, this.selectedOptionSort)
        }

        page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

        pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "#132f47";
        document.getElementById(pageString).style.color = "white";

        
      } else {
        this.start = Number(this.start) - 5;
      }
      
    }

    previousPage() {
      if(this.start > 0) {
        var page;
      
        page = Math.ceil(Number(this.start  ) / this.webService.movies_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";


        this.start = Number(this.start) - 5;
        sessionStorage.start = Number(this.start);

        if(this.selectedOptionSort == "0") {

          this.webService.getMovies(this.start, "default");
        }else 
        {
          this.webService.getMovies(this.start, this.selectedOptionSort)
        }
            page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

        pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "#132f47";
        document.getElementById(pageString).style.color = "white";
      }
    }

    firstPage() {

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";


      this.start = 0;
      sessionStorage.start = Number(this.start);
      
      if(this.selectedOptionSort == "0") {

        this.webService.getMovies(this.start, "default");
      }else 
      {
        this.webService.getMovies(this.start, this.selectedOptionSort)
      }
        page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";
    }

    lastPage() {

      var page;

      page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      this.start = this.webService.movies_count - this.webService.movies_per_page;

      sessionStorage.start = Number(this.start);
      
      if(this.selectedOptionSort == "0") {

        this.webService.getMovies(this.start, "default");
      }else 
      {
        this.webService.getMovies(this.start, this.selectedOptionSort)
      }

        page = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

    }

    getPage(page) {

      var page1;
      
      page1 = Math.ceil(Number(this.start) / this.webService.movies_per_page) + 1 ;

      var pageString = "pageButton" + page1.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";
      
      this.start = (page) * this.webService.movies_per_page;
      sessionStorage.start = Number(this.start);
      
      if(this.selectedOptionSort == "0") {

        this.webService.getMovies(this.start, "default");
      }else 
      {
        this.webService.getMovies(this.start, this.selectedOptionSort)
      }

      pageString = "pageButton" + (page + 1).toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

        
    }

    start = 0;
}