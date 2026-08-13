import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsletterComponent } from './newsletter.component';
import { HomeModule } from '../../home.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
