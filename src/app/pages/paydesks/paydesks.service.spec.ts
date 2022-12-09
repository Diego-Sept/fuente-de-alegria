import { TestBed } from '@angular/core/testing';

import { PaydesksService } from './paydesks.service';

describe('PaydesksService', () => {
  let service: PaydesksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaydesksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
