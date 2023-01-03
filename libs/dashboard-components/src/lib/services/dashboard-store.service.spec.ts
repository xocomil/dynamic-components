import { TestBed } from '@angular/core/testing';

import { DashboardStoreService } from './dashboard-store.service';

describe('DashboardStoreService', () => {
  let service: DashboardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
