import { TestBed } from '@angular/core/testing';

import { AttendenceSheetService } from './attendence-sheet.service';

describe('AttendenceSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendenceSheetService = TestBed.get(AttendenceSheetService);
    expect(service).toBeTruthy();
  });
});
