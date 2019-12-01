import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';




@Injectable()
export class configService {
    constructor(private http: HttpClient) {}
}
