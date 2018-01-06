import { inject, TestBed } from '@angular/core/testing';

import { SessionDataManagerService } from './session-data-manager.service';

describe('SessionDataManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionDataManagerService]
    });
  });

  it('should be created', inject([SessionDataManagerService], (service: SessionDataManagerService) => {
    expect(service).toBeTruthy();
  }));
});
