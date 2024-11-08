import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  const mockFirebaseService = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([])), // Mock implementation
  };
  const mockFirestore = {
    collection: jasmine.createSpy('collection'),
    collectionData: jasmine.createSpy('collectionData'),
    setDoc: jasmine.createSpy('setDoc'),
    getCollection: jasmine.createSpy('getCollection'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
        {
          provide: Firestore,
          useValue: mockFirestore,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
