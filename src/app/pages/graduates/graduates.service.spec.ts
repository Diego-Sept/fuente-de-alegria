import { TestBed } from '@angular/core/testing';

import { GraduatesService } from './graduates.service';

describe('GraduatesService', () => {
  let service: GraduatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
