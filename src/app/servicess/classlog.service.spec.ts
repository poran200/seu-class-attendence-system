import { TestBed } from '@angular/core/testing';

import { ClassLogService } from './classlog.serviece';

describe('ClasslogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassLogService = TestBed.get(ClassLogService);
    expect(service).toBeTruthy();
  });
});
