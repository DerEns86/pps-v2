import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuth: jasmine.SpyObj<Auth>;
  let mockFirebaseService: jasmine.SpyObj<FirebaseService>;

  beforeEach(() => {
    mockAuth = jasmine.createSpyObj('Auth', [], {
      signInWithEmailAndPassword: jasmine.createSpy(
        'signInWithEmailAndPassword',
      ),
      createUserWithEmailAndPassword: jasmine.createSpy(
        'createUserWithEmailAndPassword',
      ),
      signOut: jasmine.createSpy('signOut'),
    });
    mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['addUser']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth },
        { provide: FirebaseService, useValue: mockFirebaseService },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', (done) => {
    const email = 'test@example.com';
    const username = 'testuser';
    const password = 'password123';
    const mockUserCredential = {
      user: {
        uid: '12345',
        email: email,
        displayName: username,
      },
    };

    mockAuth.createUserWithEmailAndPassword.and.returnValue(
      Promise.resolve(mockUserCredential),
    );
    mockFirebaseService.addUser.and.returnValue(of(void 0));

    service.register(email, username, password).subscribe({
      next: () => {
        expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
          mockAuth,
          email,
          password,
        );
        expect(mockFirebaseService.addUser).toHaveBeenCalledWith({
          uid: '12345',
          email: email,
          username: username,
        });
        done();
      },
      error: done.fail,
    });
  });

  it('should login a user', (done) => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockUserCredential = {
      user: {
        getIdToken: () => Promise.resolve('mockToken'),
      },
    };

    mockAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve(mockUserCredential),
    );

    service.login(email, password).subscribe({
      next: () => {
        expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
          mockAuth,
          email,
          password,
        );
        done();
      },
      error: done.fail,
    });
  });

  it('should logout a user', (done) => {
    mockAuth.signOut.and.returnValue(Promise.resolve());

    service.logout().subscribe({
      next: () => {
        expect(mockAuth.signOut).toHaveBeenCalled();
        done();
      },
      error: done.fail,
    });
  });
});
