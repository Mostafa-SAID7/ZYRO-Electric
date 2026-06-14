import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideModule, ShoppingCart, Package, ShoppingBag, Trash2, Minus, Plus, Delete, CheckCircle, Check, Tag, Folder, FileText, Star, DollarSign } from 'lucide-angular';

import { UiButtonComponent } from './components/button/button.component';
import { UiCardComponent } from './components/card/card.component';
import { UiInputComponent } from './components/input/input.component';
import { UiBadgeComponent } from './components/badge/badge.component';
import { UiTableComponent } from './components/table/table.component';

const UI_COMPONENTS = [
  UiButtonComponent,
  UiCardComponent,
  UiInputComponent,
  UiBadgeComponent,
  UiTableComponent
];

@NgModule({
  declarations: [...UI_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
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
      DollarSign
    })
  ],
  exports: [...UI_COMPONENTS, LucideModule]
})
export class UiModule { }
