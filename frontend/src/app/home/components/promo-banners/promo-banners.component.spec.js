import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PromoBannersComponent } from './promo-banners.component';
import { HomeModule } from '../../home.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PromoBannersComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(PromoBannersComponent);
    component = fixture.componentInstance;
    component.promoOffers = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
