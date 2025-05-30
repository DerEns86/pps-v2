import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const mockAuth = {
    signup: () => {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, BrowserAnimationsModule],
      providers: [
        AuthService,
        { provide: AuthService, useValue: mockAuth },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
