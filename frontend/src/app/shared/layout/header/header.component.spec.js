import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Renderer2, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { CartsService } from '../../../carts/services/carts.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ProductsService } from '../../../products/services/products.service';

describe('HeaderComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        CartsService,
        AuthService,
        ProductsService,
        Renderer2
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
