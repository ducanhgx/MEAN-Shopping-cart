import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardcustomer } from './auth.guard.customer'
describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardcustomer]
    });
  });

  it('should ...', inject([AuthGuardcustomer], (guard: AuthGuardcustomer) => {
    expect(guard).toBeTruthy();
  }));
});
