import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
  CollectionReference,
  updateDoc,
  getDoc,
  deleteDoc,
} from '@angular/fire/firestore';
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

  getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  getAll<T>(collectionName: string): Observable<T[]> {
    return collectionData(this.getCollectionRef(collectionName), {
      idField: 'id',
    }) as Observable<T[]>;
  }

  getSingle<T>(collectionName: string, docId: string): Observable<T | null> {
    const documentRef = doc(this.getCollectionRef(collectionName), docId);
    return from(
      getDoc(documentRef).then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          return documentSnapshot.data() as T;
        } else {
          return null;
        }
      }),
    );
  }

  add<T>(collectionName: string, obj: T): Observable<T> {
    const promise = addDoc(this.getCollectionRef(collectionName), obj);
    return from(promise) as Observable<T>;
  }

  update<T>(collectionName: string, docId: string, obj: T): Observable<void> {
    const docRef = doc(this.getCollectionRef<T>(collectionName), docId);
    const promise = updateDoc(docRef, obj as Partial<T>);
    return from(promise);
  }

  delete<T>(collectionName: string, docId: string): Observable<void> {
    const docRef = doc(this.getCollectionRef<T>(collectionName), docId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
