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
  constructor(
    private http: HttpClient,
    private appStorage: AppStorageService,
  ) { }

  async getUrl(): Promise<string> {
      const result = await this.appStorage.get(API_ENDPOINT);
      return result !== null ? result : environment.apiUrl;
  }

  async getKey(): Promise<string> {
    const result = await this.appStorage.get(API_KEY);
    return result !== null ? result : "";
  }

  async getHeaders(): Promise<HttpHeaders> {
      const result: string = await this.appStorage.get(API_KEY);
      return result!== null
        ? new HttpHeaders({
                'Authorization': `Bearer ${result}`,
                'API-Key': `${result}`,
            })
          : new HttpHeaders();
  }

  async getAllCoffeeBeans(): Promise<Observable<Array<CoffeeBeanListing>>> {
    const apiUrl = await this.getUrl();
    const header = await this.getHeaders();
    const url = `${apiUrl}/beans`;
    return this.http.get<Array<CoffeeBeanListing>>(url, { headers: header });
  }

  async getAllCoffeeDrinks(): Promise<Observable<Array<CoffeeDrinkListing>>> {
    const apiUrl = await this.getUrl();
    const header = await this.getHeaders();
    const url = `${apiUrl}/drinks`;
    return this.http.get<Array<CoffeeDrinkListing>>(url, {headers: header });
  }

  async getCoffeeBean(id: Number): Promise<Observable<CoffeeBeanDetail>> {
    const apiUrl = await this.getUrl();
    const header = await this.getHeaders();
    const url = `${apiUrl}/beans/${id}`;
    return this.http.get<CoffeeBeanDetail>(url, { headers: header });
  }

  async getCoffeeDrink(id: Number): Promise<Observable<CoffeeDrinkDetail>> {
    const apiUrl = await this.getUrl();
    const header = await this.getHeaders();
    const url = `${apiUrl}/drinks/${id}`;
    return this.http.get<CoffeeDrinkDetail>(url, {headers: header });
  }
}
