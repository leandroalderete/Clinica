import { TestBed } from '@angular/core/testing';

import { ListamedicosService } from './listamedicos.service';

describe('ListamedicosService', () => {
  let service: ListamedicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListamedicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
