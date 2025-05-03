import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);

  signupForm: FormGroup = new FormGroup({});
  authSubription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    console.log('MyComponent initialized');
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    console.log('MyComponent destroyed');
    if (!this.authSubription.closed) {
      console.warn('Subscription is still active');
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const rawData = this.signupForm.getRawValue();
      console.log(rawData);
      this.signupForm.reset();
      this.signupForm.markAsPristine();
      this.signupForm.markAsUntouched();
      this.authSubription = this.authService
        .register(rawData.username, rawData.email, rawData.password)
        .subscribe((res) => {
          next: console.log('res', res);
          error: () => {
            console.log('error');
          };
          complete: () => {
            console.log('complete');
          };
        });
    }
  }

  onGoogleSignup() {
    this.authService.registerWithGoole().subscribe();
  }
}
