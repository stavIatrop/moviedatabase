import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent {
    constructor(private webService: WebService,
                private route: ActivatedRoute) {}

    // async ngOnInit() {
    //     var response = await this.webService.getMovie(
    //                                     this.route.snapshot.params.id);
    //     this.movie = response.json();
    // }

    ngOnInit() {
      this.webService.getMovie(this.route.snapshot.params.id);
      // this.webService.movie_list
      //     .subscribe(movies => {
      //         this.movie_list = movies
      //     })
    }

    movie = { }
}
