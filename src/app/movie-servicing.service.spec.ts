import { TestBed } from '@angular/core/testing';

import { MovieServicingService } from './movie-servicing.service';

describe('MovieServicingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieServicingService = TestBed.get(MovieServicingService);
    expect(service).toBeTruthy();
  });
});
