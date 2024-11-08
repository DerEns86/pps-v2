import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { EmployeeInterface } from '../../model/employee.interface';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnInit {
  firebaseService: FirebaseService = inject(FirebaseService);

  private employeesSubject = new BehaviorSubject<EmployeeInterface[]>([]);
  employees$ = this.employeesSubject.asObservable();

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.firebaseService
      .getAll<EmployeeInterface>('employees')
      .subscribe((employees: EmployeeInterface[]) => {
        this.employeesSubject.next(employees);
      });
  }

  addEmployee(): void {
    this.firebaseService
      .add<EmployeeInterface>('employees', {
        id: '2',
        employeeNumber: '2',
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        assignedMachine: 'mill',
        skills: ['test', 'test', 'test3'],
      })
      .subscribe({
        next: (employee) => {
          this.firebaseService.update('employees', employee.id, {
            id: employee.id,
          });
          console.log('Employee added:', employee);
        },
        complete: () => {
          console.log('Observable completed');
        },
      });
  }

  //Works
  // addEmployee(): void {
  //   this.firebaseService.add<EmployeeInterface>('employees', {
  //     id: '2',
  //     employeeNumber: '2',
  //     firstName: 'foo',
  //     lastName: 'bar',
  //     email: 'foo@bar.com',
  //     assignedMachine: 'mill',
  //     skills: ['test', 'test', 'test3'],
  //   });
  // }
}
