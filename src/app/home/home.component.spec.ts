import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should load categories from mock data', () => {
      expect(component.categories.length).toBeGreaterThan(0);
    });

    it('should load featured products from mock data', () => {
      expect(component.featuredProducts.length).toBeGreaterThan(0);
    });

    it('should load promo offers from mock data', () => {
      expect(component.promoOffers.length).toBeGreaterThan(0);
    });

    it('should have hero slides defined', () => {
      expect(component.heroSlides.length).toBeGreaterThan(0);
    });

    it('should start with activeSlide at 0', () => {
      expect(component.activeSlide).toBe(0);
    });

    it('should start autoplay on init', () => {
      spyOn(component, 'startAutoPlay');
      component.ngOnInit();
      expect(component.startAutoPlay).toHaveBeenCalled();
    });
  });

  describe('Slide Navigation', () => {
    it('nextSlide() should advance activeSlide by 1', () => {
      component.activeSlide = 0;
      component.nextSlide();
      expect(component.activeSlide).toBe(1);
    });

    it('nextSlide() should wrap around from last slide to first', () => {
      component.activeSlide = component.heroSlides.length - 1;
      component.nextSlide();
      expect(component.activeSlide).toBe(0);
    });

    it('prevSlide() should go back to previous slide', () => {
      component.activeSlide = 2;
      component.prevSlide();
      expect(component.activeSlide).toBe(1);
    });

    it('prevSlide() should wrap from first slide to last', () => {
      component.activeSlide = 0;
      component.prevSlide();
      expect(component.activeSlide).toBe(component.heroSlides.length - 1);
    });

    it('goToSlide() should set activeSlide to given index', () => {
      component.goToSlide(2);
      expect(component.activeSlide).toBe(2);
    });

    it('goToSlide() should restart autoplay', () => {
      spyOn(component, 'stopAutoPlay');
      spyOn(component, 'startAutoPlay');
      component.goToSlide(1);
      expect(component.stopAutoPlay).toHaveBeenCalled();
      expect(component.startAutoPlay).toHaveBeenCalled();
    });
  });

  describe('AutoPlay', () => {
    it('stopAutoPlay() should clear the interval', () => {
      spyOn(window, 'clearInterval');
      component.stopAutoPlay();
      expect(clearInterval).toHaveBeenCalled();
    });

    it('ngOnDestroy() should stop autoplay', () => {
      spyOn(component, 'stopAutoPlay');
      component.ngOnDestroy();
      expect(component.stopAutoPlay).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('goToProducts() should navigate to /products', () => {
      spyOn(router, 'navigate');
      component.goToProducts();
      expect(router.navigate).toHaveBeenCalledWith(['/products']);
    });

    it('goToCategory() should navigate to products with category query param', () => {
      spyOn(router, 'navigate');
      const category = component.categories[0];
      component.goToCategory(category);
      expect(router.navigate).toHaveBeenCalledWith(
        ['/products'],
        { queryParams: { category: category.id } }
      );
    });

    it('goToProduct() should navigate to /details/:productId', () => {
      spyOn(router, 'navigate');
      component.goToProduct('prod-001');
      expect(router.navigate).toHaveBeenCalledWith(['/details', 'prod-001']);
    });
  });

  describe('Hero Slides Data', () => {
    it('each hero slide should have required fields', () => {
      component.heroSlides.forEach(slide => {
        expect(slide.badge).toBeTruthy();
        expect(slide.ctaPrimary).toBeTruthy();
        expect(slide.description).toBeTruthy();
        expect(slide.tags.length).toBeGreaterThan(0);
      });
    });
  });
});
