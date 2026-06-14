import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideModule, ShoppingCart, Package, ShoppingBag, Trash2, Minus, Plus, Delete, CheckCircle, Check, Tag, Folder, FileText, Star, DollarSign, X, AlertCircle, AlertTriangle, Info, SearchX, ArrowRight, Home, RefreshCw } from 'lucide-angular';

import { UiButtonComponent } from './components/button/button.component';
import { UiCardComponent } from './components/card/card.component';
import { UiInputComponent } from './components/input/input.component';
import { UiBadgeComponent } from './components/badge/badge.component';
import { UiTableComponent } from './components/table/table.component';
import { UiToastComponent } from './components/toast/toast.component';
import { UiConfirmationComponent } from './components/confirmation/confirmation.component';
import { UiSkeletonComponent, UiSkeletonGroupComponent } from './components/skeleton/skeleton.component';
import { UiErrorComponent, UiErrorBoundaryComponent } from './components/error/error.component';
import { UiNotFoundComponent } from './components/not-found/not-found.component';

const UI_COMPONENTS = [
  UiButtonComponent,
  UiCardComponent,
  UiInputComponent,
  UiBadgeComponent,
  UiTableComponent,
  UiToastComponent,
  UiConfirmationComponent,
  UiSkeletonComponent,
  UiSkeletonGroupComponent,
  UiErrorComponent,
  UiErrorBoundaryComponent,
  UiNotFoundComponent
];

@NgModule({
  declarations: [...UI_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LucideModule.pick({
      ShoppingCart,
      Package,
      ShoppingBag,
      Trash2,
      Minus,
      Plus,
      Delete,
      CheckCircle,
      Check,
      Tag,
      Folder,
      FileText,
      Star,
      DollarSign,
      X,
      AlertCircle,
      AlertTriangle,
      Info,
      SearchX,
      ArrowRight,
      Home,
      RefreshCw
    })
  ],
  exports: [...UI_COMPONENTS, LucideModule]
})
export class UiModule { }
