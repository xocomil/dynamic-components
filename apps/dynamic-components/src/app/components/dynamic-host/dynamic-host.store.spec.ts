import { TestBed } from '@angular/core/testing';

import { DynamicHostStore } from './dynamic-host.store';

describe('DynamicHostService', () => {
  let service: DynamicHostStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicHostStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
