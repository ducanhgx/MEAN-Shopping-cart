import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardAdmin } from './auth.guard.admin.guard';

describe('Auth.Guard.AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardAdmin]
    });
  });

  it('should ...', inject([AuthGuardAdmin], (guard:AuthGuardAdmin) => {
    expect(guard).toBeTruthy();
  }));
});
