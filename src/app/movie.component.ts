import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent {
    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private router : Router) {

                  this.searchForm = formBuilder.group ( {
                    searchWords: ""
                  });

                  this.reviewForm = formBuilder.group( {
                    name: ['', Validators.required],
                    review: ['', Validators.required],
                    stars: 0
                  })
                }

    reviewForm;
    currentRate = 3;
    searchForm;

    review = {
      movieID: '',
      name: '',
      review: '',
      stars: 5
    }

    // async ngOnInit() {
    //     var response = await this.webService.getMovie(
    //                                     this.route.snapshot.params.id);
    //     this.movie = response.json();
    // }

    start = 0;

    selectedOptionView = "0";
    selectedOptionSort = "0";

    ngOnInit() {
      this.webService.getMovie(this.route.snapshot.params.id);
      //this.webService.getReviews(this.route.snapshot.params.id, this.start, "default" );
      //this.currentRate = 3;
      // this.webService.movie_list
      //     .subscribe(movies => {
      //         this.movie_list = movies
      //     })
    }


    onChangeView() {

      console.log(this.selectedOptionView);

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      this.start = 0;
      
      if(this.selectedOptionView == "All") {

        this.webService.reviews_per_page = this.webService.review_count;
        
        this.webService.getReviews(this.webService.movieID,this.start, this.selectedOptionSort);
        return;

      }else if(parseInt(this.selectedOptionView) != 0) {
        this.webService.reviews_per_page = parseInt(this.selectedOptionView);
        this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort);

      }else {
        //default view 5
        this.webService.reviews_per_page = 5;
        this.webService.getReviews(this.webService.movieID,this.start, this.selectedOptionSort);
        
      }
    }

    onChangeSort() {

      console.log(this.selectedOptionSort);

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";

      this.start = 0;

      if(this.selectedOptionSort == "0") {

        this.webService.getReviews(this.webService.movieID, this.start, "default");

      }else {

        this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort);

      }
    }


    nextPage() {
      this.start = Number(this.start) + this.webService.reviews_per_page;
      if(this.webService.review_count > this.start) {
        sessionStorage.startReview = Number(this.start);

        var page;
      
        page = Math.ceil(Number(this.start - this.webService.reviews_per_page ) / this.webService.reviews_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";

        if(this.selectedOptionSort == "0") {

          this.webService.getReviews(this.webService.movieID, this.start, "default");
        }else 
        {
          this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort)
        }

        page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

        pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "#132f47";
        document.getElementById(pageString).style.color = "white";

      } else {
        this.start = Number(this.start) - this.webService.reviews_per_page;
      }
      
    }

    previousPage() {
      if(this.start > 0) {
        var page;
      
        page = Math.ceil(Number(this.start  ) / this.webService.reviews_per_page) + 1 ;
  
        var pageString = "pageButton" + page.toString();
  
        document.getElementById(pageString).style.backgroundColor = "white";
        document.getElementById(pageString).style.color = "black";

        this.start = Number(this.start) - this.webService.reviews_per_page;
        sessionStorage.startReview = Number(this.start);
        
        if(this.selectedOptionSort == "0") {

          this.webService.getReviews(this.webService.movieID, this.start, "default");
        }else 
        {
          this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort)
        }
        page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

        pageString = "pageButton" + page.toString();

        document.getElementById(pageString).style.backgroundColor = "#132f47";
        document.getElementById(pageString).style.color = "white";
      }
    }

    firstPage() {

      var page;
      
      page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";


      this.start = 0;
      sessionStorage.startReview = Number(this.start);
      
      if(this.selectedOptionSort == "0") {

        this.webService.getReviews(this.webService.movieID, this.start, "default");
      }else 
      {
        this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort)
      }
      page = 1;
      pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";
    }

    lastPage() {

      var page;

      page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

      var pageString = "pageButton" + page.toString();

      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";

      this.start = this.webService.review_count - this.webService.reviews_per_page;
      sessionStorage.startReview = Number(this.start);
      
      if(this.selectedOptionSort == "0") {

        this.webService.getReviews(this.webService.movieID, this.start, "default");
      }else 
      {
        this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort)
      }

      page = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

      pageString = "pageButton" + page.toString();

      console.log(page);
      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";
    }

    getPage(page) {
      
      var page1;
      
      page1 = Math.ceil(Number(this.start) / this.webService.reviews_per_page) + 1 ;

      var pageString = "pageButton" + page1.toString();
      
      document.getElementById(pageString).style.backgroundColor = "white";
      document.getElementById(pageString).style.color = "black";
      
      this.start = (page) * this.webService.reviews_per_page;
      sessionStorage.startReview = Number(this.start);
      
      if(this.selectedOptionSort == "0") {

        this.webService.getReviews(this.webService.movieID, this.start, "default");
      }else 
      {
        this.webService.getReviews(this.webService.movieID, this.start, this.selectedOptionSort)
      }

      pageString = "pageButton" + (page + 1).toString();

      document.getElementById(pageString).style.backgroundColor = "#132f47";
      document.getElementById(pageString).style.color = "white";
    }

    onSubmitSearch() {
    
      console.log(this.searchForm.value.searchWords);
      sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
      this.router.navigate(["/search"]);
    }

    onSubmitReview() {

      this.review.movieID = this.webService.movieID;
      console.log(this.review);
      this.reviewForm.reset();
    }

    isInvalid(control) {
      return this.reviewForm.controls[control].invalid &&
              this.reviewForm.controls[control].touched
    }

    isIncomplete() {
      return this.isInvalid('name' ||
              this.isInvalid('review'));
    }
    
    
    movie = { };
}
