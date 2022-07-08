import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products!: Product[]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => this.products = res.data as Product[])
  }

}
