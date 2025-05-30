import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee/form/employee-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employee/add',
    component: EmployeeFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employee/:id',
    component: EmployeeFormComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
