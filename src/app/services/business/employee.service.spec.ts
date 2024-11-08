import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Firestore } from '@angular/fire/firestore';

const mockFirebaseService = {};
const mockFirestore = {
  collection: jasmine.createSpy('collection'),
  collectionData: jasmine.createSpy('collectionData'),
  setDoc: jasmine.createSpy('setDoc'),
  getCollection: jasmine.createSpy('getCollection'),
};

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: Firestore, useValue: mockFirestore },
      ],
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
