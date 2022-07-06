import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServer } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:8000/api/product'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<DataServer> {
    return this.http.get<DataServer>(this.BASE_URL)
  }

  getProduct(id: string | null): Observable<DataServer> {
    return this.http.get<DataServer>(`${this.BASE_URL}/${id}`)
  }

  formatVND(price: number) {
    return price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
  }
}
