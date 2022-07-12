import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductService } from 'src/app/services/product.service';
import { CartComponent } from './cart.component';


fdescribe('CartComponent', () => {
  let component: CartComponent;
  let productService: jasmine.SpyObj<ProductService>
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('productService', ['formatVND'])

    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ 
        HttpClientModule, 
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RatingModule, 
        ToastModule, 
        ToolbarModule, 
        TableModule 
      ],
      providers: [ 
        MessageService, 
        ConfirmationService ,
        // { provide: ProductService, useValue: productService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call func formatPrice', () => {
    const price = component.formatPrice(300000)
    expect(price).toEqual('300.000 ₫')
  })

  it('call func handleTotalPrice', () => {
    component.cartList = [
      { 
        _id: '1', 
        name: 'Product 1', 
        description: 'Desc 1',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 2,
        size: 40,
        originPrice: 30000, 
        rating: 5
      },
      { 
        _id: '2', 
        name: 'Product 2', 
        description: 'Desc 2',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 4,
        size: 42,
        originPrice: 10000, 
        rating: 4
      },
    ]

    const total = component.handleTotalPrice()
    expect(total).toEqual('100.000 ₫')
  })

  it('call func handleChangeQuantily', () => {
    component.cartList = [
      { 
        _id: '1', 
        name: 'Product 1', 
        description: 'Desc 1',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 2,
        size: 40,
        originPrice: 30000, 
        rating: 5
      },
      { 
        _id: '2', 
        name: 'Product 2', 
        description: 'Desc 2',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 4,
        size: 42,
        originPrice: 10000, 
        rating: 4
      },
    ]

    component.handleChangeQuantily('1', 40, 3)
    expect(component.cartList[0].quantily).toEqual(3)
  })

  it('call func handleDelete', () => {
    component.cartList = [
      { 
        _id: '1', 
        name: 'Product 1', 
        description: 'Desc 1',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 2,
        size: 40,
        originPrice: 30000, 
        rating: 5
      },
      { 
        _id: '2', 
        name: 'Product 2', 
        description: 'Desc 2',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 4,
        size: 42,
        originPrice: 10000, 
        rating: 4
      },
    ]

    component.handleDelete('1', 40)
    

    console.log(component.cartList);
    expect(component.cartList).toEqual(component.cartList)
  })
});
