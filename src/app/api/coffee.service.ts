import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_ENDPOINT, API_KEY } from '../app.constants';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CoffeeBeanDetail, CoffeeBeanListing, CoffeeDrinkDetail, CoffeeDrinkListing } from '../model/api-responses';
import { Observable } from 'rxjs';
import { AppStorageService } from '../app-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private apiUrl: String = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private appStorage: AppStorageService,
  ) { }

  getAllCoffeeBeans(): Observable<Array<CoffeeBeanListing>> {
    const url = `${this.apiUrl}/beans`;
    const header = new HttpHeaders();
    return this.http.get<Array<CoffeeBeanListing>>(url, { headers: header });
  }

  getAllCoffeeDrinks(): Observable<Array<CoffeeDrinkListing>> {
    const url = `${this.apiUrl}/drinks`;
    const header = new HttpHeaders();
    return this.http.get<Array<CoffeeDrinkListing>>(url, {headers: header});
  }

  getCoffeeBean(id: Number): Observable<CoffeeBeanDetail> {
    const url = `${this.apiUrl}/beans/${id}`;
    const header = new HttpHeaders();
    return this.http.get<CoffeeBeanDetail>(url, { headers: header });
  }

  getCoffeeDrink(id: Number): Observable<CoffeeDrinkDetail> {
    const url = `${this.apiUrl}/drinks/${id}`;
    const header = new HttpHeaders();
    return this.http.get<CoffeeDrinkDetail>(url, {headers: header});
  }
}
