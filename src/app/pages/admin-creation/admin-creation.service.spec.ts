import { TestBed } from '@angular/core/testing';

import { AdminCreationService } from './admin-creation.service';

describe('AdminCreationService', () => {
  let service: AdminCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
