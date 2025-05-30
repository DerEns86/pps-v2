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
import { Router } from '@angular/router';
import { EmployeeInterface } from '../../model/employee.interface';

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
  router: Router = inject(Router);

  employees$ = this.employeeService.employees$;

  ngOnInit() {
    this.employeeService.loadEmployees();
  }

  onAddEmployee() {
    this.router.navigateByUrl('/employee/add');
  }

  onEdit(employee: EmployeeInterface) {
    this.router.navigateByUrl(`/employee/${employee.id}`);
  }
}
