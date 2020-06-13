import { TestBed } from '@angular/core/testing';

import { PrefectureService } from './prefecture.service';

describe('PrefectureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrefectureService = TestBed.get(PrefectureService);
    expect(service).toBeTruthy();
  });
});
