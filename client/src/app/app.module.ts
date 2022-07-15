import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule, TableService } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './common/table/table.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HeaderComponent } from './component/header/header.component';
import { PolicyComponent } from './component/policy/policy.component';
import { ProductComponent } from './component/product/product.component';
import { ProductsComponent } from './component/products/products.component';
import { ReviewsComponent } from './component/reviews/reviews.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    PolicyComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    DetailProductComponent,
    ReviewsComponent,
    CartComponent,
    AdminComponent,
    TableComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    CarouselModule,
    HttpClientModule,
    PaginatorModule,
    PanelModule,
    BrowserAnimationsModule,
    RatingModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    PasswordModule,
    FileUploadModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
  ],
  providers: [ConfirmationService, MessageService, Table, TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
