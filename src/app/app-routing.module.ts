import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TrackingComponent } from './orders/components/tracking/tracking.component';
import { UiNotFoundComponent } from './shared/ui/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: AllProductsComponent
  },
  {
    path: 'details/:id',
    component: ProductsDetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/tracking/:id',
    component: TrackingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '404',
    component: UiNotFoundComponent
  },
  {
    path: '**',
    component: UiNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
