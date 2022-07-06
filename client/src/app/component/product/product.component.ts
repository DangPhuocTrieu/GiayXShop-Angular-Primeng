import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product
  imageSelected!: string

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.imageSelected = this.product.images.image_1
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }

  handleHoverImage(event: any) {
    this.imageSelected = event.target.src
  }

  handleNavigate(id: string) {
    this.router.navigate(['product', id])
    // this.router.navigateByUrl(`product/${id}`)
  }

}
