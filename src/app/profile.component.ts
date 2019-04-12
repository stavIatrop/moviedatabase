import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private router : Router) {

                    this.searchForm = formBuilder.group ( {
                        searchWords: ""
                    });
                }

    searchForm;

    
    ngOnInit() {

        
        if(sessionStorage.movieEdit) {
            sessionStorage.removeItem("movieEdit");
        }
        if(this.route.snapshot.params.username == "") {
            this.router.navigate(['/']);
        }
        console.log(this.route.snapshot.params.username);
        this.webService.getProfile(this.route.snapshot.params.username);
    }

    onSubmitSearch() {
    
        console.log(this.searchForm.value.searchWords);
        sessionStorage.setItem("searchString", this.searchForm.value.searchWords);
        this.router.navigate(["/search"]);
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