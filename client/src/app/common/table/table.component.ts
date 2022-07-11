import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns!: any[]
  @Input() data!: any[]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }
}
