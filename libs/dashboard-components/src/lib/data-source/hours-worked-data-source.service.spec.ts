import { TestBed } from '@angular/core/testing';

import { HoursWorkedDataSourceService } from './hours-worked-data-source.service';

describe('BarChartDatasourceService', () => {
  let service: HoursWorkedDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoursWorkedDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
