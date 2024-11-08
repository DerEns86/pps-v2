import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

describe('FirebaseService', () => {
  let service: FirebaseService;
  // let firestore: Firestore;
  let firestoreMock: jasmine.SpyObj<Firestore>; ///

  const mockFirebaseService = {};
  // const mockFirestore = {
  //   collection: jasmine.createSpy('collection'),
  //   collectionData: jasmine.createSpy('collectionData'),
  //   setDoc: jasmine.createSpy('setDoc'),
  //   getCollection: jasmine.createSpy('getCollection'),
  // };

  beforeEach(() => {
    // firestoreMock = jasmine.createSpyObj('Firestore', ['collection']);
    firestoreMock = jasmine.createSpyObj('Firestore', ['collection']);
    TestBed.configureTestingModule({
      imports: [AngularFirestoreModule],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
    service = TestBed.inject(FirebaseService);
    // firestore = TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
