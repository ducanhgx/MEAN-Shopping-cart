import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementProductsAdminComponent } from './management-products-admin.component';

describe('ManagementProductsAdminComponent', () => {
  let component: ManagementProductsAdminComponent;
  let fixture: ComponentFixture<ManagementProductsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementProductsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
