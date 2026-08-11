import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CartsService } from './carts.service';

describe('CartsService', () => {
  let service: CartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
