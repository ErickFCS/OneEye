import { TestBed } from '@angular/core/testing';
import { TargetMovie } from './target-movie';
import { Movie } from '../types/movie';

describe('TargetMovieService', () => {
  let service: TargetMovie;

  // Reusing the mock movie object we defined earlier
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    description: 'Description',
    rating: 5,
    imageURLEnd: 'test.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetMovie],
    });
    service = TestBed.inject(TargetMovie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial value of undefined', () => {
    // Check initial and default state
    expect(service.targetMovie()).toBeUndefined();
  });

  it('should update the signal value when set', () => {
    service.targetMovie.set(mockMovie);

    expect(service.targetMovie()).toEqual(mockMovie);
  });

  it('should allow clearing the value back to undefined', () => {
    service.targetMovie.set(mockMovie);
    expect(service.targetMovie()).toBeDefined();

    service.targetMovie.set(undefined);

    expect(service.targetMovie()).toBeUndefined();
  });
});
