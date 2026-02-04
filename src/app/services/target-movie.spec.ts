import { TestBed } from '@angular/core/testing';

import { TargetMovie } from './target-movie';

describe('TargetMovie', () => {
  let service: TargetMovie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetMovie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
