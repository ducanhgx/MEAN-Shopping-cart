import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomersAdminComponent } from './management-customers-admin.component';

describe('ManagementCustomersAdminComponent', () => {
  let component: ManagementCustomersAdminComponent;
  let fixture: ComponentFixture<ManagementCustomersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementCustomersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCustomersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
