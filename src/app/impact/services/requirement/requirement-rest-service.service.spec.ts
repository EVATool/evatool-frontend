import {TestBed} from '@angular/core/testing';

import {RequirementRestService} from './requirement-rest.service';
import {RestMock} from "../../spec/RestMock";

describe('RequirementRestServiceService', () => {
  let service: RequirementRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMock.imports,
      providers: RestMock.providers
    });
    service = TestBed.inject(RequirementRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
