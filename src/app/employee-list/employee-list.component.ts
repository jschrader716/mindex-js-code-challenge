import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../services/employee.service';
import {EmployeeModalComponent} from '../employee-modal/employee-modal.component';

import {MatDialog} from '@angular/material/dialog';
import { ToastService } from '../services/toast-service.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

const MOD_EDIT = "EDIT";
const MOD_DELETE = "DELETE";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, private toastService: ToastService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.populateEmployees();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  // in the html employee list component, this function is listening to the modifyEmployee eventEmitter in the employee component
  public handleEmployeeModification(data: any) {
    if(data && data?.action && data?.employee) {
      switch(data.action.toUpperCase()) {
        case MOD_EDIT:
          this.openEmployeeDialog(data.employee);
          break;
        case MOD_DELETE:
          this.openDeleteDialog(data.employee);
          break;
        default:
          return;
      }
    }
  }

  openEmployeeDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      data: {
        employee: employee,
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result?.newComp && result?.employee) {
        // update compensation value
        var employee = result.employee;
        employee.compensation = result.newComp;

        this.saveEmployee(employee).then((empData) => {
          this.toastService.toastMessage("Employee Updated Successfully!");
        });
      }
    });
  }

  openDeleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        employee: employee,
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result?.delete && result?.employee) {
        /*
          After we successfully delete the employee, normally I would not do this, but let's loop through each employee and find the emp id value in each employee's direct reports property and yank it out.

          Otherwise, the server is 'erroring' because it can't find the Id of an employee that was deleted. The issue is the Id still remains in the array of directReports on the employee entity.
          In a normal situation, I would have the API return a 200 with an empty payload and the value would just be ignored if the API couldn't find it.
          Also, I'm assuming there would be some kind of logic that would populate the employee entity with the directReports property data on the backend that would accurately reflect the deletion of an employee entity from the database.
          Therefore, when the employee data is grabbed again from to refresh the grids, this issue would no longer be occurring.
        */

        this.employeeIdRemoval(employee.id).then((res) => {
          // delete employee
          this.deleteEmployee(employee).then((empData) => {
            this.populateEmployees();
            this.toastService.toastMessage("Employee Deleted Successfully!");
          });
        });
      }
    });
  }

  private saveEmployee(employee: Employee): Promise<any> {
    return new Promise((resolve) => {
      this.employeeService.save(employee).subscribe((emp) => {
        resolve(emp);
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  private deleteEmployee(employee: Employee): Promise<any> {
    return new Promise((resolve) => {
      this.employeeService.remove(employee).subscribe((emp) => {
        resolve(emp);
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  private populateEmployees() {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private employeeIdRemoval(deletedId: number): Promise<any> {
    return new Promise((resolve) => {
      this.employees.forEach((emp: Employee) => {
        if(emp.id == deletedId) return;

        var dirtyIndex = emp.directReports?.findIndex(x => x == deletedId);
        if(dirtyIndex != -1 && emp.directReports) {
          // remove index from array
          emp.directReports.splice(dirtyIndex, 1);
          this.updateEmployee(emp);
        }
      });
      resolve(true);
    })
    .catch((err) => console.error(err));
  }

  private updateEmployee(employee) {
    this.employeeService.save(employee).subscribe((emp) => {
      // do nothing;
    });
  }
}
