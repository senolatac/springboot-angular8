import { TestBed } from '@angular/core/testing';

import { ManagerService } from './manager.service';

describe('ManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerService = TestBed.get(ManagerService);
    expect(service).toBeTruthy();
  });
});
