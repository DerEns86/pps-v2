import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { of } from 'rxjs';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  const mockFirebaseService = {
    getAll: jasmine.createSpy('getAll').and.returnValue(
      of([
        {
          id: '1',
          firstname: 'John Doe',
          email: 'john@doe.com',
        },
      ]),
    ), // Mock implementation
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
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

  it('should get all employees', () => {
    component.ngOnInit();
    expect(mockFirebaseService.getAll).toHaveBeenCalled();
    expect(component.employees$).toBeTruthy();
  });
});
