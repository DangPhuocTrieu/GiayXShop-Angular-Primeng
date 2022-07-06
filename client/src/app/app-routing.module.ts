import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { HomeComponent } from './component/pages/home/home.component';

const routes: Routes = [
  { path: '',  children: [
    { path: '', component: HomeComponent },
    { path: 'product/:id', component: DetailProductComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
