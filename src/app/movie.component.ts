import { Component, HostListener } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';
// import { c } from '@angular/core/src/render3';

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
      this.webService.getMovie(this.route.snapshot.params.id, this.selectedOptionSort);
      // let roundedItems = document.getElementsByClassName("rounded") as HTMLCollectionOf<HTMLElement>;
      // for(var i = 0; i < roundedItems.length; i++ ) {

      //   roundedItems[i].style.boxShadow = "0 0 0 1px rgb(19, 47, 71)";
      //   roundedItems[i].style.marginLeft = "40px;";
      // }
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
      this.webService.postReview(this.review, this.selectedOptionSort);
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

    likeSubmit(review, i) {

      console.log("likeButton" + i);
     
      if(document.getElementById("likeButton" + i).style.backgroundColor == "rgb(19, 47, 71)") {

        setTimeout( () => { document.getElementById("likeButton" + i).style.color = "black";
                            document.getElementById("likeButton" + i).style.backgroundColor = "rgb(240, 241, 242)";
                            (<HTMLInputElement> document.getElementById("dislikeButton" + i)).removeAttribute('disabled');}, 100);
        

        review.votes.like = review.votes.like - 1;

        this.webService.updateVotes(this.webService.movieID, review, this.selectedOptionSort);

      } else {      //if it is not clicked, make dislike button disabled

        setTimeout( () => { (<HTMLInputElement> document.getElementById("dislikeButton" + i)).setAttribute('disabled', 'true');
                            document.getElementById("likeButton" + i).style.color = "white";
                            document.getElementById("likeButton" + i).style.backgroundColor = "#132f47";}, 100);

        
        review.votes.like = review.votes.like + 1;
        
        
        this.webService.updateVotes(this.webService.movieID, review, this.selectedOptionSort);
      }
      
    }

    // hoverLike(review, i) {

    //   document.getElementById("likeButton" + i).style.backgroundImage = "linear-gradient(to bottom right, #235581, #132f47)";

    // }

    // leaveLike(review, i) {

    //   document.getElementById("likeButton" + i).style.backgroundImage = "none";
    // }

    // hoverDislike(review, i) {

    //   document.getElementById("dislikeButton" + i).style.backgroundImage = "linear-gradient(to bottom right, #235581, #132f47)";

    // }

    // leaveDislike(review, i) {

    //   document.getElementById("dislikeButton" + i).style.backgroundImage = "none";
    // }
    dislikeSubmit(review, i) {

      if(document.getElementById("dislikeButton" + i).style.backgroundColor == "rgb(19, 47, 71)") {     

        setTimeout( () => { document.getElementById("dislikeButton" + i).style.color = "black";
                            document.getElementById("dislikeButton" + i).style.backgroundColor = "rgb(240, 241, 242)";
                            (<HTMLInputElement> document.getElementById("likeButton" + i)).removeAttribute('disabled');}, 100);
        

        review.votes.dislike = review.votes.dislike - 1;

        this.webService.updateVotes(this.webService.movieID, review, this.selectedOptionSort);

      } else {        //if it is not clicked, make like button disabled
        
        setTimeout( () => { document.getElementById("likeButton" + i).setAttribute('disabled', 'true');
                             document.getElementById("dislikeButton" + i).style.color = "white";
                             document.getElementById("dislikeButton" + i).style.backgroundColor = "#132f47";}, 100);
        
        

        review.votes.dislike = review.votes.dislike + 1;
        
        this.webService.updateVotes(this.webService.movieID, review, this.selectedOptionSort);
      }
    }
    
    delete(review) {
      
      this.webService.deleteReview(this.webService.movieID, review, this.selectedOptionSort);
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

    movie = { };
}
