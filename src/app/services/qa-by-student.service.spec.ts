import { TestBed } from '@angular/core/testing';

import { QaByStudentService } from './qa-by-student.service';

describe('QaByStudentService', () => {
  let service: QaByStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaByStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
