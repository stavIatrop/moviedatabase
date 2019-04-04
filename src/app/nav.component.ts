import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
 selector: 'navigation',
 templateUrl: './nav.component.html',
 styleUrls: ['./nav.component.css']
})

export class NavComponent { 

    constructor(private authService: AuthService) {}
}