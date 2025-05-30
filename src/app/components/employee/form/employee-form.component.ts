import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../../services/business/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  currentEmployeeId: string | undefined = undefined;

  @ViewChild('form') form: any;

  employeeForm: FormGroup = this.fb.nonNullable.group({
    employeeNumber: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    skills: [''],
  });
  skillList: string[] = ['test', 'test2'];

  ngOnInit() {
    this.currentEmployeeId = this.activatedRoute.snapshot.params['id'];
    if (this.currentEmployeeId) {
      this.getEmployeeById(this.currentEmployeeId);
    }
  }

  getEmployeeById(id: string) {
    this.employeeService.getSingleEmployee(id).subscribe({
      next: (value) => this.employeeForm.patchValue(value!),
      error: (err) => console.log(err),
      complete: () => console.log('emp done'),
    });
  }

  onSubmit() {
    this.onAddEmployee();
  }

  onNavigateBack() {
    this.router.navigateByUrl('/employee');
  }

  onAddEmployee() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.form.resetForm();
      this.router.navigateByUrl('/employee');
    }
  }

  onUpdateEmployee() {
    this.employeeService.updateEmployee(
      this.currentEmployeeId!,
      this.employeeForm.value,
    );
    this.form.resetForm();
    this.currentEmployeeId = undefined;
    this.router.navigateByUrl('/employee');
  }

  onDeleteEmployee() {
    console.log('employee deleted: ', this.currentEmployeeId);
    if (this.currentEmployeeId !== undefined) {
      this.employeeService.deleteEmployee(this.currentEmployeeId);
    }
    this.form.resetForm();
    this.currentEmployeeId = undefined;
    this.router.navigateByUrl('/employee');
  }
}
