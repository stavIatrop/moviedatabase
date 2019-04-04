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
        this.router.navigate(["/search"]);
      }
}