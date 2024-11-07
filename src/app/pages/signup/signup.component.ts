import { Component, inject } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatButtonModule,
    MatError,
    MatCardActions,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  errorMessage: string | null = null;

  signupForm: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    const rawData = this.signupForm.getRawValue();
    this.authService
      .register(rawData.email, rawData.username, rawData.password)
      .subscribe({
        next: () => {
          this.signupForm.reset();
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.warn(this.errorMessage);
        },
      });
  }
}
