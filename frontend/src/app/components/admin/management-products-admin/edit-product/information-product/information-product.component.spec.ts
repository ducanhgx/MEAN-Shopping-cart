import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationProductComponent } from './information-product.component';

describe('InformationProductComponent', () => {
  let component: InformationProductComponent;
  let fixture: ComponentFixture<InformationProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
