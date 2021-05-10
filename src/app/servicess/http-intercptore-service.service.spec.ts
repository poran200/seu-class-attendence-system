import { TestBed } from '@angular/core/testing';

import { HttpIntercptoreServiceService } from './http-intercptore-service.service';

describe('HttpIntercptoreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpIntercptoreServiceService = TestBed.get(HttpIntercptoreServiceService);
    expect(service).toBeTruthy();
  });
});
