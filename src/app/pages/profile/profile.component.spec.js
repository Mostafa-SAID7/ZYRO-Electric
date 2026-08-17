import { TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../auth/services/auth.service';
import { OrderService } from '../../orders/services/order.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component;
  let fixture;

  const mockAuthService = {
    getUserProfile: () => of(null)
  };

  const mockOrderService = {
    getOrders: () => of({ items: [], total: 0, page: 1, limit: 50 })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: OrderService, useValue: mockOrderService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
