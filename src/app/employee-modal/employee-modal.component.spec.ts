import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalComponent } from './employee-modal.component';
import { EmployeeService } from '../services/employee.service';
import { ToastService } from '../services/toast-service.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EmployeeModalComponent', () => {
  let component: EmployeeModalComponent;
  let fixture: ComponentFixture<EmployeeModalComponent>;

  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['save']);
  const toastServiceSpy = jasmine.createSpyObj('ToastService', ['toastMessage']);
  const fb = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeModalComponent ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: ToastService, useValue: toastServiceSpy},
        {provide: FormBuilder, useValue: fb},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
