import { TestBed } from '@angular/core/testing';

import { ImportExportRestService } from './import-export-rest.service';
import {SpecService} from '../spec.service';

describe('ImportExportRestService', () => {
  let service: ImportExportRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports
    });
    service = TestBed.inject(ImportExportRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
