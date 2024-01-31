import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({selector: 'app-employee-list', template: ''})
class EmployeeListComponent {
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmployeeListComponent,
        SuperSecretComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));
});
