import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CART_KEY } from 'src/app/constants';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList!: any[]
  cartListTemp!: any[]
  productsSelected: any[] = []

  constructor(private productService: ProductService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cartList = this.productService.getCartListStorage()
    this.cartListTemp = this.cartList
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }

  handleTotalPrice() {
    return this.formatPrice(this.cartList.reduce((total, cur) => total += cur.originPrice * cur.quantily , 0))
  }

  handleChangeQuantily(id: string, size: number , newQuantily: number) {
    if(newQuantily > 0) {
      this.cartList = this.cartList.map(item => {
        if(item._id === id && item.size === size) {
          item.quantily = newQuantily
        }
  
        return item
      })
  
      localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))
    }
  }
  
  handleDelete(id: string, size: number): void { 
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {   
        this.cartList = this.cartList.filter(item => (item._id === id && item.size !== size) || item._id !== id)
        
        localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))
        this.productService.displayMessage('Deleted product', 'Successfully')
      }
    })
  }

  handleMultipleDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete select products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {   
        this.productsSelected.map((item: any) => {
          this.cartList = this.cartList.filter(x => {
            return (item._id === x._id && item.size !== x.size) || item._id !== x._id
          })
        })

        localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))
    
        this.productService.displayMessage('Deleted selected products', 'Successfully')
      }
    })
  }

  handleSearchChange(e: any) {
    const searchValue = e.target.value
    this.cartList = this.cartListTemp.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
  }
}
