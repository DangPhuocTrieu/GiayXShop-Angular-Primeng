import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product!: Product
  imageSelected!: string
  sizes!: number[]
  sizeSelected!: number


  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct()

    this.sizes = [36, 37, 38, 39, 40, 41, 42]
    this.sizeSelected = this.sizes[0]
  }

  getProduct() {
    let id = this.route.snapshot.paramMap.get('id')
    this.productService.getProduct(id).subscribe(res => {
      this.product = res.data as Product
      this.imageSelected = this.product.images.image_1
    })
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }

  handleChangeImage(event: any) {
    this.imageSelected = event.target.src
  }

  handleChooseSize(size: number) {
    this.sizeSelected = size
  }
}
