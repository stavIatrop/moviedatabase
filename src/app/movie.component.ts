import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
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
                private authService: AuthService) {

                  this.reviewForm = formBuilder.group( {
                    name: ['', Validators.required],
                    review: ['', Validators.required],
                    stars: Number
                  })
                }

    reviewForm;

    // async ngOnInit() {
    //     var response = await this.webService.getMovie(
    //                                     this.route.snapshot.params.id);
    //     this.movie = response.json();
    // }

    ngOnInit() {
      this.webService.getMovie(this.route.snapshot.params.id);
      this.webService.getReviews(this.route.snapshot.params.id);
      // this.webService.movie_list
      //     .subscribe(movies => {
      //         this.movie_list = movies
      //     })
    }

    nextPage() {
      this.start = Number(this.start) + this.webService.reviews_per_page;
      if(this.webService.review_count > this.start) {
        sessionStorage.startReview = Number(this.start);
        this.webService.getReviews(this.start);
      }
      
    }

    previousPage() {
      if(this.start > 0) {
        this.start = Number(this.start) - this.webService.reviews_per_page;
        sessionStorage.startReview = Number(this.start);
        this.webService.getReviews(this.start);
      }
    }

    firstPage() {
      this.start = 0;
      sessionStorage.startReview = Number(this.start);
      this.webService.getReviews(this.start);
    }

    lastPage() {

      this.start = this.webService.review_count - this.webService.reviews_per_page;
      sessionStorage.startReview = Number(this.start);
      this.webService.getReviews(this.start);
    }

    getPage(page) {
      console.log(page);
      this.start = (page) * this.webService.reviews_per_page;
      sessionStorage.startReview = Number(this.start);
      this.webService.getReviews(this.start);
    }

    onSubmit() {
      console.log(this.reviewForm.valid);
    }

    isInvalid(control) {
      return this.reviewForm.controls[control].invalid &&
              this.reviewForm.controls[control].touched
    }

    isIncomplete() {
      return this.isInvalid('name' ||
              this.isInvalid('review'));
    }
    
    start = 0;
    movie = { };
}
