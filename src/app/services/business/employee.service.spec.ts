import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Firestore } from '@angular/fire/firestore';

const mockFirebaseService = {};
// const mockFirestore = {};

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        // { provide: Firestore, useValue: mockFirestore },
      ],
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
