import { TestBed } from '@angular/core/testing';

import { FaceitService } from './faceit.service';

describe('FaceitService', () => {
  let service: FaceitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
