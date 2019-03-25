import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    constructor(private http: Http) {}

    getBusinesses() {
        return this.http.get(
            'http://localhost:3000/api/businesses')
            .toPromise();
    }
}