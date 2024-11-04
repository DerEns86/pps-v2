import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { Subscription } from 'rxjs';

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
    email: ['', [(Validators.required, Validators.email)]],
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
        this.errorMessage = err.code;
        // console.log(err.code);
      },
    });
    this.loginForm.reset();
    this.loginForm.markAsUntouched();
    this.loginForm.markAsPristine();
  }

  registerWithGoogle() {
    console.log('registered with google');
    this.authService
      .registerGoogle()
      .subscribe(() => this.router.navigateByUrl('/dashboard'));
  }

  registerWithGithub() {
    console.log('registered with github');
    this.authService
      .registerGithub()
      .subscribe(() => this.router.navigateByUrl('/dashboard'));
  }
}
