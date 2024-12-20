import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  user,
} from '@angular/fire/auth';
import { catchError, from, Observable, throwError } from 'rxjs';
import { UserInterface } from '../model/user.interface';
import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$: Observable<User | null> = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  provider = new GoogleAuthProvider();
  githubProvider = new GithubAuthProvider();

  register(
    email: string,
    username: string,
    password: string,
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response) =>
      updateProfile(response.user, { displayName: username }),
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {
      console.log(this.currentUserSig());
    });
    return from(promise).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              `Authentication failed. Please check your credentials. ${error.message}`,
            ),
        );
      }),
    );
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.currentUserSig.update(() => null);
    return from(promise);
  }

  registerGoogle(): Observable<void> {
    const promise = signInWithPopup(this.firebaseAuth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('check: ', this.currentUserSig()?.uid);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    return from(promise);
  }

  registerGithub(): Observable<void> {
    const promise = signInWithPopup(this.firebaseAuth, this.githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
    return from(promise);
  }
}
