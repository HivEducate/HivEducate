import { TestBed } from '@angular/core/testing';

import { QaByTeacherService } from './qa-by-teacher.service';

describe('QaByTeacherService', () => {
  let service: QaByTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaByTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
