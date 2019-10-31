import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceShopComponent } from './introduce-shop.component';

describe('IntroduceShopComponent', () => {
  let component: IntroduceShopComponent;
  let fixture: ComponentFixture<IntroduceShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroduceShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduceShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
