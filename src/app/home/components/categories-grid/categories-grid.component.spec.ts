import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesGridComponent } from './categories-grid.component';
import { HomeModule } from '../../home.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoriesGridComponent', () => {
  let component: CategoriesGridComponent;
  let fixture: ComponentFixture<CategoriesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesGridComponent);
    component = fixture.componentInstance;
    component.categories = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
