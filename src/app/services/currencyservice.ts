import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExchangeRateResponse} from '../models/exchangerateresponse';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
    apiUrl = 'https://open.er-api.com/v6/latest/:Base';
    constructor(private http: HttpClient) { }

    getData(base: string) {
  const url = this.apiUrl.replace(':Base', base);

  console.log(url);

  return this.http.get<ExchangeRateResponse>(url);
}
}