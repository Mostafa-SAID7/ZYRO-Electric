import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent  {constructor() { HeroSliderComponent.prototype.__init.call(this);HeroSliderComponent.prototype.__init2.call(this);HeroSliderComponent.prototype.__init3.call(this);HeroSliderComponent.prototype.__init4.call(this); }
   __init() {this.router = inject(Router)}

  Input() __init2() {this.heroSlides = []}
  
  __init3() {this.activeSlide = 0}
   __init4() {this.autoPlayInterval = null}

  ngOnInit() {
    if (this.heroSlides.length > 0) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  goToSlide(index) {
    this.stopAutoPlay();
    this.activeSlide = index;
    this.startAutoPlay();
  }

  nextSlide() {
    if (!this.heroSlides.length) return;
    this.activeSlide = (this.activeSlide + 1) % this.heroSlides.length;
  }

  prevSlide() {
    if (!this.heroSlides.length) return;
    this.activeSlide = (this.activeSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
