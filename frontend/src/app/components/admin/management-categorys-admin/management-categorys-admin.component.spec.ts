import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCategorysAdminComponent } from './management-categorys-admin.component';

describe('ManagementCategorysAdminComponent', () => {
  let component: ManagementCategorysAdminComponent;
  let fixture: ComponentFixture<ManagementCategorysAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementCategorysAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCategorysAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
