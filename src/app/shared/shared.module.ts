import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';
import { LucideModule } from 'lucide-angular';
import { ShoppingCart, Package, ShoppingBag, Trash2, Minus, Plus, Delete, CheckCircle, Check, Tag, Folder, FileText, Star, DollarSign } from 'lucide-angular';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
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
  exports: [
    HeaderComponent,
    BrowserModule,
    SpinnerComponent,
    RouterModule,
    FormsModule,
    SelectComponent,
    LucideModule
  ]
})
export class SharedModule { }
