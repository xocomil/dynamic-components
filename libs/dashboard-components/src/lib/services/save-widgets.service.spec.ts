import { TestBed } from '@angular/core/testing';

import { SaveWidgetsService } from './save-widgets.service';

describe('SaveWidgetsService', () => {
  let service: SaveWidgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveWidgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
