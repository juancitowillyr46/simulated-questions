import { TestBed } from '@angular/core/testing';

import { IsFooterGuard } from './is-footer.guard';

describe('IsFooterGuard', () => {
  let guard: IsFooterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsFooterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
