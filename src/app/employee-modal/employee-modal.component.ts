import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { ToastService } from '../services/toast-service.service';

const DELETION_ACTION = "DELETE";
const SAVED_ACTION = "SAVED";
const POSITIVE_NUMBER_REGEX = new RegExp(/^[+]?\d+([.]\d+)?$/);

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  private employeeData: any;

  public form: FormGroup;

  constructor(
    // private
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastService: ToastService,

    // public
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmployeeModalComponent>
    )
  {
    this.form = this.fb.group({
      firstName: [{value: null, disabled: true}, [Validators.required]],
      lastName: [{value: null, disabled: true}, [Validators.required]],
      position: [{value: null, disabled: true}, [Validators.required]],
      compensation: [0, [Validators.required, Validators.pattern(POSITIVE_NUMBER_REGEX)]]
    });

    if(data && data?.employee) {
      this.employeeData = data.employee;
    }
  }

  ngOnInit() {
    if(this.employeeData) {
      this.populateForm(this.employeeData)
    }
  }

  public saveEmployee() {
    // check if form is valid
    if(this.form.valid) {
      this.dialogRef.close({ newComp: this.form.controls.compensation.value, employee: this.employeeData});
    }
    else {
      this.toastService.toastMessage("Compensation is required and must be a positive number.");
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private populateForm(employee: Employee) {
    this.form.controls.firstName.setValue(this.employeeData.firstName);
    this.form.controls.lastName.setValue(this.employeeData.lastName);
    this.form.controls.position.setValue(this.employeeData.position);
    this.form.controls.compensation.setValue(this.employeeData.compensation);
  }
}
