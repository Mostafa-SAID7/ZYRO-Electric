import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ProductsDetailsComponent } from './products-details.component';
import { ProductsService } from '../../services/products.service';
import { CartsService } from '../../../carts/services/carts.service';

describe('ProductsDetailsComponent', () => {
  let component;
  let fixture;
  let productsService;
  let cartsService;
  let router;

  const mockProduct = {
    id: '1',
    title: 'Test Product',
    price: 100,
    description: 'Test',
    category: 'test-category',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 },
    stock: 10
  };

  const mockReviews = {
    items: [
      { id: '1', userName: 'User 1', rating: 5, comment: 'Great!' }
    ]
  };

  beforeEach(async () => {
    const productsSpy = jasmine.createSpyObj('ProductsService', ['getProductById', 'getProductReviews']);
    const cartsSpy = jasmine.createSpyObj('CartsService', ['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsDetailsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductsService, useValue: productsSpy },
        { provide: CartsService, useValue: cartsSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('1')
              }
            }
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    productsService = TestBed.inject(ProductsService) ;
    cartsService = TestBed.inject(CartsService) ;
    router = TestBed.inject(Router);
    
    spyOn(router, 'navigate');

    productsService.getProductById.and.returnValue(of(mockProduct ));
    productsService.getProductReviews.and.returnValue(of(mockReviews ));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDetailsComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();

    // Mock the ViewChild toast
    component.toast = {
      type: 'success',
      title: '',
      message: '',
      show: jasmine.createSpy('show')
    } ;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit / loadProduct', () => {
    it('should load product and reviews if id is present', () => {
      expect(productsService.getProductById).toHaveBeenCalledWith('1');
      expect(component.product).toEqual(mockProduct );
      expect(productsService.getProductReviews).toHaveBeenCalledWith('1');
      expect(component.reviews).toEqual(mockReviews.items );
    });

    it('should handle product not found error', () => {
      productsService.getProductById.and.returnValue(throwError(() => new Error('Not found')));
      component.loadProduct();
      
      expect(component.toast.show).toHaveBeenCalled();
      expect(component.toast.type).toBe('error');
      expect(component.toast.title).toBe('Product not found');
      expect(component.isLoading).toBeFalse();
    });

    it('should handle missing id in route', () => {
      const route = TestBed.inject(ActivatedRoute);
      (route.snapshot.paramMap.get ).and.returnValue(null);
      
      component.loadProduct();
      expect(router.navigate).toHaveBeenCalledWith(['/products']);
    });

    it('should handle reviews fetch error gracefully', () => {
      component.reviews = [];
      productsService.getProductReviews.and.returnValue(throwError(() => new Error('Error')));
      component.loadReviews('1');
      // Should not throw or crash, just handles silently
      expect(component.reviews).toEqual([]);
    });
  });

  describe('Quantity Controls', () => {
    it('should increase quantity if less than stock', () => {
      component.product = { stock: 5 } ;
      component.quantity = 2;
      component.increaseQuantity();
      expect(component.quantity).toBe(3);
    });

    it('should not increase quantity if at stock limit', () => {
      component.product = { stock: 5 } ;
      component.quantity = 5;
      component.increaseQuantity();
      expect(component.quantity).toBe(5);
    });

    it('should decrease quantity if greater than 1', () => {
      component.quantity = 3;
      component.decreaseQuantity();
      expect(component.quantity).toBe(2);
    });

    it('should not decrease quantity if at 1', () => {
      component.quantity = 1;
      component.decreaseQuantity();
      expect(component.quantity).toBe(1);
    });
  });

  describe('addToCart', () => {
    it('should not add to cart if product is null or stock is 0', () => {
      component.product = null;
      component.addToCart();
      expect(cartsService.addToCart).not.toHaveBeenCalled();

      component.product = { stock: 0 } ;
      component.addToCart();
      expect(cartsService.addToCart).not.toHaveBeenCalled();
    });

    it('should add to cart successfully', () => {
      cartsService.addToCart.and.returnValue(of({} ));
      component.product = { id: '1', title: 'Test Product', stock: 10 } ;
      component.quantity = 2;
      
      component.addToCart();
      
      expect(cartsService.addToCart).toHaveBeenCalledWith({ productId: '1', quantity: 2 });
      expect(component.toast.show).toHaveBeenCalled();
      expect(component.toast.type).toBe('success');
      expect(component.toast.title).toBe('Added to cart');
      expect(component.quantity).toBe(1);
    });

    it('should handle add to cart error', () => {
      cartsService.addToCart.and.returnValue(throwError(() => new Error('Error')));
      component.product = { id: '1', stock: 10 } ;
      
      component.addToCart();
      
      expect(component.toast.show).toHaveBeenCalled();
      expect(component.toast.type).toBe('error');
      expect(component.toast.title).toBe('Error');
    });
  });

  describe('Utility methods', () => {
    it('should format category correctly', () => {
      expect(component.formatCategory('mens-clothing')).toBe('Mens Clothing');
    });

    it('should navigate back on goBack', () => {
      component.goBack();
      expect(router.navigate).toHaveBeenCalledWith(['/products']);
    });
  });
});
