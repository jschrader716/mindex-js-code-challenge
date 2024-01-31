import {Component, Input, Output, EventEmitter } from '@angular/core';

import {Employee} from '../employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;

  @Output() modifyEmployee = new EventEmitter<{ action: string; employee: Employee }>();

  // employees that report to employee
  public totalReports: number = 0;

  // employees report reference list
  public directEmpRep: Employee[] = [];
  public indirectEmpRep: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  // called after constructor and component's inputs have been initialized
  ngOnInit() {
    this.getReportingEmployees(this.employee);
  }

  private getReportingEmployees(employee: Employee, isDirectRep: boolean = true) {
    // if direct reports does not exist on model or it's length is less than or equal to 0 (bad data, could be negative) then we are done looping.
    if(!employee.directReports || employee.directReports?.length <= 0) {
      return;
    }

    if(employee.directReports) {
      // this adds both direct and indirect reports for the employee that is passed in
      this.totalReports += employee.directReports.length;

      // loop through all employeeIds in direct reports array
      employee.directReports.forEach((empId: number) => {
        // call next employee in directReports list
        this.employeeService.get(empId).subscribe((subEmp: Employee) => {

          if(subEmp != null) {
            // add whether employee is a direct reporting employee or an indirect reporting employee
            (isDirectRep) ? this.directEmpRep.push(subEmp) : this.indirectEmpRep.push(subEmp);
          }

          // get employees under this employee
          this.getReportingEmployees(subEmp, false);
        }),
        (err) => {
          console.error(err);
        }
      });
    }
  }

  public editEmployeeReport(employee: Employee) {
    // Employer List Component is listening for this emitter and handles it in handleEmployeeModification function
    this.modifyEmployee.emit({ action: "edit", employee: employee });
  }

  public deleteEmployeeReport(employee: Employee) {
    // Employer List Component is listening for this emitter and handles it in handleEmployeeModification function
    this.modifyEmployee.emit({ action: "delete", employee: employee });
  }
}
