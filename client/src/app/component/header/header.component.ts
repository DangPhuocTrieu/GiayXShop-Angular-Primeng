import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { USER_KEY } from '../../constants/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartsTotal!: string
  user!: any

  constructor(private productService: ProductService, private authService: AuthService) { 
    this.user = authService.getUserStorage()
  }

  ngOnInit(): void {
    const cartList = this.productService.getCartListStorage()
    this.cartsTotal = cartList.reduce((total: number, cur: any) => total += cur.quantily, 0).toString()
  }

  handleLogout() {
    localStorage.removeItem(USER_KEY)
  }

}
