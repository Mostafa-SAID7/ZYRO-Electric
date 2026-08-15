import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingComponent } from './shipping.component';
import { SHIPPING_OPTIONS } from './data';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load shipping options from data.ts', () => {
    expect(component.shippingOptions).toEqual(SHIPPING_OPTIONS);
    expect(component.shippingOptions.length).toBe(4);
  });

  it('should have all shipping options with required properties', () => {
    component.shippingOptions.forEach(option => {
      expect(option.name).toBeDefined();
      expect(option.processing).toBeDefined();
      expect(option.delivery).toBeDefined();
      expect(option.cost).toBeDefined();
      expect(option.coverage).toBeDefined();
    });
  });

  it('should have 4 shipping options: Standard, Expedited, Overnight, International', () => {
    const names = component.shippingOptions.map(o => o.name);
    expect(names).toContain('Standard Shipping');
    expect(names).toContain('Expedited Shipping');
    expect(names).toContain('Overnight Shipping');
    expect(names).toContain('International');
  });

  it('should have Standard Shipping with 2-5 days processing', () => {
    const standard = component.shippingOptions.find(o => o.name === 'Standard Shipping');
    expect(standard).toBeDefined();
    if (standard) {
      expect(standard.processing).toContain('2-5');
    }
  });

  it('should have Standard Shipping with free option over $50', () => {
    const standard = component.shippingOptions.find(o => o.name === 'Standard Shipping');
    expect(standard).toBeDefined();
    if (standard) {
      expect(standard.cost).toContain('free over $50');
    }
  });

  it('should have Expedited Shipping with 1-2 days processing', () => {
    const expedited = component.shippingOptions.find(o => o.name === 'Expedited Shipping');
    expect(expedited).toBeDefined();
    if (expedited) {
      expect(expedited.processing).toContain('1-2');
    }
  });

  it('should have Overnight Shipping costing $24.99', () => {
    const overnight = component.shippingOptions.find(o => o.name === 'Overnight Shipping');
    expect(overnight).toBeDefined();
    if (overnight) {
      expect(overnight.cost).toContain('$24.99');
    }
  });

  it('should have International coverage to 150+ countries', () => {
    const international = component.shippingOptions.find(o => o.name === 'International');
    expect(international).toBeDefined();
    if (international) {
      expect(international.coverage).toContain('150+');
    }
  });

  it('should have all domestic options covering Continental US', () => {
    const domesticOptions = component.shippingOptions.filter(o => 
      o.name !== 'International'
    );
    domesticOptions.forEach(option => {
      expect(option.coverage).toContain('Continental US');
    });
  });

  it('should have delivery times properly labeled', () => {
    const standard = component.shippingOptions.find(o => o.name === 'Standard Shipping');
    const expedited = component.shippingOptions.find(o => o.name === 'Expedited Shipping');
    const overnight = component.shippingOptions.find(o => o.name === 'Overnight Shipping');
    
    // Verify delivery times are present and in correct order
    expect(standard?.delivery).toContain('5-10');
    expect(expedited?.delivery).toContain('2-3');
    expect(overnight?.delivery).toContain('Next business day');
  });
});
