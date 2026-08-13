import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesGridComponent } from './features-grid.component';
import { HomeModule } from '../../home.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeaturesGridComponent', () => {
  let component: FeaturesGridComponent;
  let fixture: ComponentFixture<FeaturesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesGridComponent);
    component = fixture.componentInstance;
    component.features = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
