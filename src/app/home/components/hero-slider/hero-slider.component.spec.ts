import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSliderComponent } from './hero-slider.component';
import { HomeModule } from '../../home.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroSliderComponent', () => {
  let component: HeroSliderComponent;
  let fixture: ComponentFixture<HeroSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSliderComponent);
    component = fixture.componentInstance;
    component.heroSlides = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
