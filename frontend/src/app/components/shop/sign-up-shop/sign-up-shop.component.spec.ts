import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpShopComponent } from './sign-up-shop.component';

describe('SignUpShopComponent', () => {
  let component: SignUpShopComponent;
  let fixture: ComponentFixture<SignUpShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
