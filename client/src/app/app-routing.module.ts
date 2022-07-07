import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '',  children: [
    { path: 'product/:id', component: DetailProductComponent },
    { path: 'cart', component: CartComponent },
    { path: '', component: HomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
