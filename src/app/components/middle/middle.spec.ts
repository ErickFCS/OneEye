import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Middle } from './middle';
import { TargetMovie } from '../../services/target-movie';
import { Tmdb } from '../../services/tmdb';
import { signal as signalCore } from '@angular/core';
import { Movie } from '../../types/movie';
import { Rating } from '../rating/rating';


describe('MiddleComponent', () => {
  let component: Middle;
  let fixture: ComponentFixture<Middle>;

  // Mocks
  let mockTargetMovieSig: any;
  let mockTmdb: any;

  // Mock Data
  const MOCK_MOVIE: Movie = {
    id: 1,
    title: 'Inception',
    description: 'A dream within a dream.',
    rating: 9,
    imageURLEnd: '/inception.jpg',
  };

  beforeEach(async () => {
    mockTargetMovieSig = signalCore(undefined);
    const mockTargetMovieService = {
      targetMovie: mockTargetMovieSig,
    };

    mockTmdb = {
      imageSizes: signalCore(['w300', 'w780', 'original']),
      getImageURL: (size: string, end: string) => {
        if (!size || !end) return '';
        return `https://mock-tmdb/${size}${end}`;
      },
    };

    await TestBed.configureTestingModule({
      imports: [Middle, Rating],
      providers: [
        { provide: TargetMovie, useValue: mockTargetMovieService },
        { provide: Tmdb, useValue: mockTmdb },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Middle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle undefined movie gracefully', () => {
    expect(component.title()).toBeUndefined();
    expect(component.description()).toBeUndefined();
    expect(component.stars()).toBe(0);
    expect(component.imageURL()).toBe('');
  });

  it('should display movie details when targetMovie is set', () => {
    mockTargetMovieSig.set(MOCK_MOVIE);
    fixture.detectChanges();

    expect(component.title()).toBe('Inception');
    expect(component.description()).toBe('A dream within a dream.');
    expect(component.stars()).toBe(9);

    expect(component.imageURL()).toBe('https://mock-tmdb/original/inception.jpg');
  });

  it('should update the DOM', () => {
    mockTargetMovieSig.set(MOCK_MOVIE);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const titleEl = compiled.querySelector('h2');
    expect(titleEl?.textContent).toContain('Inception');

    const descEl = compiled.querySelector('p');
    expect(descEl?.textContent).toContain('A dream within a dream.');

    const imgEl = compiled.querySelector('img');
    expect(imgEl?.src).toContain('https://mock-tmdb/original/inception.jpg');
  });
});
