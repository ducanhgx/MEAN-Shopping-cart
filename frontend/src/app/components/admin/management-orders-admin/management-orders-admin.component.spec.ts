import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOrdersAdminComponent } from './management-orders-admin.component';

describe('ManagementOrdersAdminComponent', () => {
  let component: ManagementOrdersAdminComponent;
  let fixture: ComponentFixture<ManagementOrdersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementOrdersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOrdersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
