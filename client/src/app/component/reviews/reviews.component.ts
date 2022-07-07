import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() product!: Product

  reviews!: Review[]
  reviewsTotalString!: string

  form!: FormGroup

  constructor(private productService: ProductService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(15)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })

    this.reviews = this.product.reviews
    this.reviewsTotalString = this.reviews.length.toString() || '0'
  }

  handleSubmit(form: FormGroup) {
    form.markAllAsTouched()

    if(form.valid) {
      this.productService.addReview(this.product._id, form.value).subscribe({
        next: (res: any) => {
          this.reviews = [ ...this.reviews, res.data.reviews[res.data.reviews.length - 1] ]
          this.reviewsTotalString = (parseInt(this.reviewsTotalString) + 1).toString()
          this.productService.displayMessage('Reviews added', 'Successfully')
          form.reset()
        },
        error: ({ error }) => {       
          this.productService.displayMessage(error.message ? error.message : 'Internal server error', 'Error', 'error')
        }
      })
    }
  }
}
