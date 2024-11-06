import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';

const mockFirestore = {
  collection: () => {},
};

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: FirebaseService, useValue: mockFirestore },
      ],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
