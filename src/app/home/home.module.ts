import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UiModule } from '../shared/ui/ui.module';

import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { StatsComponent } from './components/stats/stats.component';
import { CategoriesGridComponent } from './components/categories-grid/categories-grid.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { PromoBannersComponent } from './components/promo-banners/promo-banners.component';
import { FeaturesGridComponent } from './components/features-grid/features-grid.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ParallaxGalleryComponent } from './components/3d-parallax-gallery/parallax-gallery.component';

import { LucideAngularModule, Laptop, Smartphone, Camera, Zap, ChevronLeft, ChevronRight, ArrowRight, Star, Mail, Image } from 'lucide-angular';

@NgModule({
  declarations: [
    HomeComponent,
    HeroSliderComponent,
    StatsComponent,
    CategoriesGridComponent,
    FeaturedProductsComponent,
    PromoBannersComponent,
    FeaturesGridComponent,
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
    ParallaxGalleryComponent,
    LucideAngularModule.pick({ Laptop, Smartphone, Camera, Zap, ChevronLeft, ChevronRight, ArrowRight, Star, Mail, Image })
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
