import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { Observer } from 'rxjs';
import { DataServer } from 'src/app/models/data';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products!: Product[]
  images!: any

  isVisible: boolean = false

  observer: Observer<any> = {
    next: (data: DataServer) => {
      if(data.status === 'CREATE') {
        this.productService.displayMessage('Successfully', 'User created')
      }
      else if(data.status === 'EDIT') {
        this.productService.displayMessage('Successfully', 'User updated')
      }
      else {
        this.productService.displayMessage('Successfully', 'User deleted')
      }

      this.isVisible = false
      this.getProducts()
    },
    error: ({ error }: any) => {
      this.productService.displayMessage('Error', error.message ? error.message : 'Internal server error', 'error')
    }, 
    complete: () => {}
  }

  form: FormGroup = this.fb.group({
    _id: [''],
    name: ['', Validators.required], 
    description: ['', Validators.required],
    discount: ['', Validators.required],
    price: ['', Validators.required]
  })

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
    )
     { }

  ngOnInit(): void {
    this.getProducts()
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl)
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.data as Product[]
    })
  }

  openNew() {
    this.isVisible = true
    this.form.reset()
    this.images = null
  }
 
  editProduct(product: Product) {
    this.isVisible = true
    this.form.patchValue(product)
    this.images = product.images
  }

  // CLOSE DIALOG
  hideDialog() {
    this.isVisible = false
  }

  // CREATE FORM DATA
  createFormData(file: File) {
    const form = new FormData()
    form.append('file', file)
    form.append('upload_preset', 'instagramimages')

    return form
  }

  // CHOOSE FILE IMAGE
  handleSelectImage(event: any) {
    const files = event.files

    this.images = {
      image_1: URL.createObjectURL(files[0]),
      image_2: URL.createObjectURL(files[1]),
      image_3: URL.createObjectURL(files[2])
    }
  }

  // SUBMIT FORM
  saveUser(form: FormGroup) {
    form.markAllAsTouched()
    
    if(!form.valid) return

    // EDIT USER
    if(form.value._id) {
      
    }

    // CREATE USER
    else {

    }
  }

  // DELETE USER
  handleDeleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(this.observer)
      }
    })
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
      }
    })
  }

  handleSearchChange() {
   
  }

}
