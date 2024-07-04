import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getCategories method', () => {
    expect(service.getCategories).toBeTruthy();
  });

  it('should have a getProducts method', () => {
    expect(service.getProducts).toBeTruthy();
  });

  it('should have a getProduct method', () => {
    expect(service.getProduct).toBeTruthy();
  });

  it('should have a createProduct method', () => {
    expect(service.createProduct).toBeTruthy();
  });

  it('should have a updateProduct method', () => {
    expect(service.updateProduct).toBeTruthy();
  });

  it('should have a deleteProduct method', () => {
    expect(service.deleteProduct).toBeTruthy();
  });
});
