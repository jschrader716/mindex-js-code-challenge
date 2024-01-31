import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { ToastService } from '../services/toast-service.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  public employeeData: any;

  constructor(
    // private
    private employeeService: EmployeeService,
    private toastService: ToastService,

    // public
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteModalComponent>
  )
  {

    if(data && data?.employee) {
      this.employeeData = data.employee;
    }
  }

  ngOnInit() {

  }

  public deleteEmployee() {
    this.dialogRef.close({ delete: true, employee: this.employeeData });
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
