import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInShopComponent } from './sign-in-shop.component';

describe('SignInShopComponent', () => {
  let component: SignInShopComponent;
  let fixture: ComponentFixture<SignInShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
