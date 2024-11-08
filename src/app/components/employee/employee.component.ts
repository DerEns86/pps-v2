import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { EmployeeService } from '../../services/business/employee.service';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatButton,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);

  employees$ = this.employeeService.employees$;

  ngOnInit() {
    this.employeeService.loadEmployees();
  }

  addEmployee() {
    this.employeeService.addEmployee();
    console.log('employee added');
  }
}
