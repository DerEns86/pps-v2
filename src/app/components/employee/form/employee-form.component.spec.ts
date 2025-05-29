import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeService } from '../../../services/business/employee.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  let mockEmployeeService = {
    // employees$: of([
    //   {
    //     id: 'test',
    //     employeeNumber: '123',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john.doe@example.com',
    //     skills: ['test'],
    //   },
    // ]),
    getSingleEmployee: () =>
      of({
        id: 'test',
        employeeNumber: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        skills: ['test'],
      }),
  };
  let mockActivatedRoute = {
    snapshot: {
      params: { id: 'test' },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent, BrowserAnimationsModule],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
