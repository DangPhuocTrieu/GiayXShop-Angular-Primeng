import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartsTotal!: string

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const cartList = this.productService.getCartListStorage()
    this.cartsTotal = cartList.reduce((total: number, cur: any) => total += cur.quantily, 0)
  }

}
