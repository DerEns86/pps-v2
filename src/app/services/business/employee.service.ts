import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  addEmployee(employee: EmployeeInterface): void {
    this.firebaseService
      .add<EmployeeInterface>('employees', employee)
      .subscribe({
        next: (employee) => {
          this.firebaseService.update('employees', employee.id, {
            id: employee.id,
            assignedMachine: '',
          });
          console.log('Employee added:', employee);
        },
        complete: () => {
          console.log('Observable completed');
        },
      });
  }

  getSingleEmployee(docId: string): Observable<EmployeeInterface | null> {
    return this.firebaseService
      .getSingle<EmployeeInterface>('employees', docId)
      .pipe(
        map((emp) => {
          if (emp === null) {
            throw new Error('Employee not found');
          }
          return emp;
        }),
      );
  }

  updateEmployee(docId: string, employee: EmployeeInterface): void {
    this.firebaseService.update('employees', docId, employee).subscribe({
      next: () => console.log(`Employee ${docId} updated successfully`),
      error: (err) => console.error(`Failed to update employee ${docId}:`, err),
    });
  }

  deleteEmployee(docId: string): void {
    this.firebaseService
      .delete<EmployeeInterface>('employees', docId)
      .subscribe({
        error: (err) => {
          throw new Error(err);
        },
        complete: () => console.log('delete done'),
      });
  }
}
