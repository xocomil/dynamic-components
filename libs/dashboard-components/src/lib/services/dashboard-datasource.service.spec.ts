import { TestBed } from '@angular/core/testing';

import { DashboardDataSourceService } from './dashboard-data-source.service';

describe('DashboardDatasourceService', () => {
  let service: DashboardDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
