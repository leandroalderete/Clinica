import { TestBed } from '@angular/core/testing';

import { ConsultasBackServiceService } from './consultas-back-service.service';

describe('ConsultasBackServiceService', () => {
  let service: ConsultasBackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasBackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
