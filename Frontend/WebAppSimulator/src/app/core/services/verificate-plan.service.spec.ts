import { TestBed } from '@angular/core/testing';

import { VerificatePlanService } from './verificate-plan.service';

describe('VerificatePlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerificatePlanService = TestBed.get(VerificatePlanService);
    expect(service).toBeTruthy();
  });
});
