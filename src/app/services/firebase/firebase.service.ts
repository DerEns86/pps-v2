import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { UserInterface } from '../../model/user.interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  addUser(user: UserInterface): Observable<void> {
    const docRef = doc(this.firestore, 'users', user.uid);
    const promise = setDoc(docRef, user);
    return from(promise);
  }
}
