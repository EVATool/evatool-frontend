import { TestBed } from '@angular/core/testing';

import { ImportExportRestService } from './import-export-rest.service';

describe('ImportExportRestService', () => {
  let service: ImportExportRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportExportRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
