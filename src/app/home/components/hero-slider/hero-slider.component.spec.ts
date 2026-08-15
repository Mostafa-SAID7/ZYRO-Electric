import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSliderComponent } from './hero-slider.component';
import { HomeModule } from '../../home.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HeroSliderComponent', () => {
  let component: HeroSliderComponent;
  let fixture: ComponentFixture<HeroSliderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSliderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.heroSlides = [
      { badge: '1', badgeIcon: 'zap', badgeBg: '', badgeBorder: '', badgeText: '', titlePrefix: 'Slide 1', titleHighlight: '', titleSuffix: '', description: 'Sub 1', ctaPrimary: 'Go 1', ctaSecondary: '', image: 'img1.jpg', bgGradient: '', accentColor: '', tags: [] },
      { badge: '2', badgeIcon: 'zap', badgeBg: '', badgeBorder: '', badgeText: '', titlePrefix: 'Slide 2', titleHighlight: '', titleSuffix: '', description: 'Sub 2', ctaPrimary: 'Go 2', ctaSecondary: '', image: 'img2.jpg', bgGradient: '', accentColor: '', tags: [] },
      { badge: '3', badgeIcon: 'zap', badgeBg: '', badgeBorder: '', badgeText: '', titlePrefix: 'Slide 3', titleHighlight: '', titleSuffix: '', description: 'Sub 3', ctaPrimary: 'Go 3', ctaSecondary: '', image: 'img3.jpg', bgGradient: '', accentColor: '', tags: [] }
    ];
    jasmine.clock().install();
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start autoplay on init if slides exist', () => {
    spyOn(component, 'startAutoPlay');
    component.ngOnInit();
    expect(component.startAutoPlay).toHaveBeenCalled();
  });

  it('should stop autoplay on destroy', () => {
    spyOn(component, 'stopAutoPlay');
    component.ngOnDestroy();
    expect(component.stopAutoPlay).toHaveBeenCalled();
  });

  it('should go to specific slide and restart autoplay', () => {
    spyOn(component, 'stopAutoPlay');
    spyOn(component, 'startAutoPlay');
    
    component.goToSlide(2);
    
    expect(component.stopAutoPlay).toHaveBeenCalled();
    expect(component.activeSlide).toBe(2);
    expect(component.startAutoPlay).toHaveBeenCalled();
  });

  it('should go to next slide', () => {
    component.activeSlide = 0;
    component.nextSlide();
    expect(component.activeSlide).toBe(1);
    
    component.activeSlide = 2; // last slide
    component.nextSlide();
    expect(component.activeSlide).toBe(0); // wrap around
  });

  it('should not go to next slide if no slides', () => {
    component.heroSlides = [];
    component.activeSlide = 0;
    component.nextSlide();
    expect(component.activeSlide).toBe(0);
  });

  it('should go to prev slide', () => {
    component.activeSlide = 1;
    component.prevSlide();
    expect(component.activeSlide).toBe(0);
    
    component.activeSlide = 0; // first slide
    component.prevSlide();
    expect(component.activeSlide).toBe(2); // wrap around
  });

  it('should not go to prev slide if no slides', () => {
    component.heroSlides = [];
    component.activeSlide = 0;
    component.prevSlide();
    expect(component.activeSlide).toBe(0);
  });

  it('should change slide on interval', () => {
    component.activeSlide = 0;
    jasmine.clock().tick(5000);
    expect(component.activeSlide).toBe(1);
    jasmine.clock().tick(5000);
    expect(component.activeSlide).toBe(2);
  });

  it('should navigate to products', () => {
    component.goToProducts();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
