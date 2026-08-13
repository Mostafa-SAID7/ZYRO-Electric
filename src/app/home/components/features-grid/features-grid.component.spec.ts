import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesGridComponent } from './features-grid.component';

describe('FeaturesGridComponent', () => {
  let component: FeaturesGridComponent;
  let fixture: ComponentFixture<FeaturesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
