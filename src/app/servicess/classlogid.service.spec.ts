import { TestBed } from '@angular/core/testing';

import { ClasslogidService } from './classlogid.service';

describe('ClasslogidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasslogidService = TestBed.get(ClasslogidService);
    expect(service).toBeTruthy();
  });
});
