import { TestBed } from '@angular/core/testing';

import { ClientClassService } from './client-class.service';

describe('ClientClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientClassService = TestBed.get(ClientClassService);
    expect(service).toBeTruthy();
  });
});
