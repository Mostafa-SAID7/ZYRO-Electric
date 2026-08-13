import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoBannersComponent } from './promo-banners.component';

describe('PromoBannersComponent', () => {
  let component: PromoBannersComponent;
  let fixture: ComponentFixture<PromoBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoBannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
