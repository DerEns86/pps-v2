import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let firestoreMock: jasmine.SpyObj<Firestore>;

  const mockFirebaseConfig = {
    apiKey: 'mock-api-key',
    authDomain: 'mock-auth-domain',
    projectId: 'mock-project-id',
    storageBucket: 'mock-storage-bucket',
    messagingSenderId: 'mock-sender-id',
    appId: 'mock-app-id',
  };

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('Firestore', ['collection']);
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(mockFirebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [{ provide: Firestore, useValue: firestoreMock }],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject firestore', () => {
    expect(service.firestore).toEqual(firestoreMock);
  });
});
