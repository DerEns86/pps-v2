import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockAuthService = {
  user$: of({
    uid: '123',
    email: 'test@example.com',
    displayName: 'Test User',
  }), // Mocked observable
  currentUserSig: (() => null) as any,
  logout: jasmine.createSpy('logout').and.returnValue(of(true)), // Mocked logout method
};
mockAuthService.currentUserSig.set = jasmine.createSpy('set');

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MatSidenavModule, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
    tick();
  }));

  it(`should have the 'pps-v2' title`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.title).toEqual('PPS-v2');
    tick();
  }));

  it('should render title', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('PPS-v2');
    tick();
  }));
});
