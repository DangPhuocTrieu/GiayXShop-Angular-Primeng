import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CART_KEY } from '../constants';
import { DataServer } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:8000/api/product'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProducts(): Observable<DataServer> {
    return this.http.get<DataServer>(this.BASE_URL)
  }

  getProduct(id: string | null): Observable<DataServer> {
    return this.http.get<DataServer>(`${this.BASE_URL}/${id}`)
  }

  addReview(id: string, data: any): Observable<DataServer> {
    return this.http.post<DataServer>(`${this.BASE_URL}/review/${id}`, data )
  }

  formatVND(price: number) {
    return price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
  }

  calcPriceDiscount(price: number, discount: number | null) {
    if(discount) {
      return price - (price / 100 * discount)
    }
    else {
      return price
    }
  }

  getCartListStorage() {
    const cartsJSON: any = localStorage.getItem(CART_KEY)
    return cartsJSON !== null ? JSON.parse(cartsJSON) : []

  }

  displayMessage(detail: string,summary?: string, severity: string = 'success') {
    this.messageService.add({ severity, summary, detail })
  }
}
