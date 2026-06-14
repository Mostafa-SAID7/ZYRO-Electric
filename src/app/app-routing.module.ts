import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { UiNotFoundComponent } from './shared/ui/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: AllProductsComponent },
  { path: 'details/:id', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '404', component: UiNotFoundComponent },
  { path: '**', component: UiNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
