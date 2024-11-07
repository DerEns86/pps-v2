import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  errorMessage: string | null = null;
  loginForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    const rawData = this.loginForm.getRawValue();
    // console.log(rawData);
    this.authService.login(rawData.email, rawData.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err.code);
      },
    });
    this.loginForm.reset();
    this.loginForm.markAsUntouched();
    this.loginForm.markAsPristine();
  }

  registerWithGoogle() {
    console.log('registered with google');
    this.authService.registerGoogle().subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (error) => console.error('Google sign-in error: ', error),
    });
  }

  registerWithGithub() {
    console.log('registered with github');
    this.authService.registerGithub().subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (error) => console.error('Github sign-in error: ', error),
    });
  }
}
