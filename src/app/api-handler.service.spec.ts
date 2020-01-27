import { TestBed } from '@angular/core/testing';

import { ApiHandlerService } from './api-handler.service';

describe('ApiHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiHandlerService = TestBed.get(ApiHandlerService);
    expect(service).toBeTruthy();
  });
});
