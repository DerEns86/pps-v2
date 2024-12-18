import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  userSubscribtion!: Subscription;
  title = 'PPS-v2';

  ngOnInit(): void {
    this.userSubscribtion = this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.authService.currentUserSig.set({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }

  logout() {
    this.authService
      .logout()
      .subscribe(() => this.router.navigateByUrl('/login'));
  }
}
