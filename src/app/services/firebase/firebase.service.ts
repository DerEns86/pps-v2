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

  getCollection<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  // getAll(collectionName: string): Observable<any[]> {
  //   return collectionData(this.getCollection(collectionName), {
  //     idField: 'id',
  //   }) as Observable<any[]>;
  // }

  getAll<T>(collectionName: string): Observable<T[]> {
    return collectionData(this.getCollection(collectionName), {
      idField: 'id',
    }) as Observable<T[]>;
  }

  getSingle<T>(collectionName: string, docId: string) {
    return doc(this.getCollection(collectionName), docId);
  }

  add<T>(collectionName: string, obj: T): Observable<T> {
    const promise = addDoc(this.getCollection(collectionName), obj);
    return from(promise) as Observable<T>;
  }

  update<T>(colName: string, docId: string, obj: T): Observable<void> {
    const docRef = doc(this.getCollection<T>(colName), docId);
    const promise = updateDoc(docRef, obj as Partial<T>);
    return from(promise);
  }
}
