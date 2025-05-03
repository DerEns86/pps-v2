import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private auth = inject(Auth);

  provider = new GoogleAuthProvider();

  constructor() {}

  ngOnDestroy(): void {}

  register(username: string, email: string, password: string) {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    console.log(username, email, password);
    return from(promise);
  }

  registerWithGoole() {
    const promise = signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log('Token:', token);

        // The signed-in user info.
        const user = result.user;
        console.log('Google-User: ', user);

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
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    return from(promise);
  }
}
