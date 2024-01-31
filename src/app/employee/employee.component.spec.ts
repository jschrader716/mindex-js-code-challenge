import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';
import { EmployeeService } from '../services/employee.service';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  let fixture: ComponentFixture<EmployeeComponent>;
  let component: EmployeeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      compensation: 'compensation'
    };

    expect(comp).toBeTruthy();
  }));

  // test for edit emitter function
  it('should emit the employee object and action when editEmployeeReport is called', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;

    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      compensation: 'compensation'
    };

    let emittedValue: any | undefined;
    component.modifyEmployee.subscribe((value) => (emittedValue = value));

    // action
    component.editEmployeeReport(comp.employee);

    // expectation of outcome
    expect(emittedValue).toEqual({ action: "edit", employee: comp.employee });
  });


  // test for delete emitter function
  it('should emit the employee object and action when deleteEmployeeReport is called', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;

    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      compensation: 'compensation'
    };

    let emittedValue: any | undefined;
    component.modifyEmployee.subscribe((value) => (emittedValue = value));

    // action
    component.deleteEmployeeReport(comp.employee);

    // expectation of outcome
    expect(emittedValue).toEqual({ action: "delete", employee: comp.employee });
  });
});
