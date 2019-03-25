import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})

export class BusinessesComponent {
    // business_list = [
    //     { "name": "Pizza Place",
    //         "city": "Coleriane",
    //         "review_count": 10 },
    //     { "name": "Wine Lake",
    //         "city": "Ballymoney",
    //         "review_count": 7 },
    //     { "name": "Beer Tavern",
    //         "city": "Ballymena",
    //         "review_count": 12 }
    // ];

    constructor(private webService: WebService) {}

    async ngOnInit() {
        var response = await this.webService.getBusinesses();
    }
    business_list = [
        
    ];
}