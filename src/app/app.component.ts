import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIcon,
    MatSidenavModule,
    MatToolbarModule,
    MatDivider,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  breakpointObserver = inject(BreakpointObserver);

  userSubscribtion!: Subscription;
  breakpointSubscribtion!: Subscription;
  title = 'PPS-v2';

  drawerMode: MatDrawerMode = 'side';

  @ViewChild('drawer') drawer!: MatDrawer;

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
    this.observeWidth();
  }

  observeWidth() {
    this.breakpointSubscribtion = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.XSmall])
      .subscribe((result) => {
        if (result.matches) {
          this.drawerMode = 'over';
        } else {
          this.drawerMode = 'side';
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
    this.breakpointSubscribtion.unsubscribe();
  }

  onLogout() {
    this.authService
      .logout()
      .subscribe(() => this.router.navigateByUrl('/login'));
  }

  closeDrawer(): void {
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }
}
