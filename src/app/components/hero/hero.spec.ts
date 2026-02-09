import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { Tmdb } from '../../services/tmdb';
import { TargetMovie } from '../../services/target-movie';
import { signal, WritableSignal } from '@angular/core';
import { Movie } from '../../types/movie';

describe('HeroComponent', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  let mockImageSizes: WritableSignal<string[]>;
  let mockTargetMovieSig: WritableSignal<Movie | undefined>;

  // As any to avoid linting warnings
  let mockTmdbService: any;
  let mockTargetMovieService: any;

  const MOVIE_DATA: Movie = {
    id: 1,
    title: 'Test Movie',
    description: 'Desc',
    rating: 5,
    imageURLEnd: '/poster.jpg',
  };

  beforeEach(async () => {
    mockImageSizes = signal(['w300', 'original']);
    mockTargetMovieSig = signal(undefined);

    mockTmdbService = {
      imageSizes: mockImageSizes,

      getImageURL: (size: string, end: string) => {
        if (size && end) return `https://mock-base/${size}${end}`;
        return '';
      },
    };

    mockTargetMovieService = {
      targetMovie: mockTargetMovieSig,
    };

    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        { provide: Tmdb, useValue: mockTmdbService },
        { provide: TargetMovie, useValue: mockTargetMovieService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty URL if no movie is selected', () => {
    expect(component.imageURL()).toBe('');
  });

  it('should generate correct URL when movie and sizes exist', () => {
    mockTargetMovieSig.set(MOVIE_DATA);
    fixture.detectChanges();

    const expectedUrl = 'https://mock-base/original/poster.jpg';

    expect(component.imageURL()).toBe(expectedUrl);
    expect(component.backgroundImageStyle()).toBe(`url(${expectedUrl})`);
  });

  it('should handle updates dynamically', () => {
    mockTargetMovieSig.set(MOVIE_DATA);
    fixture.detectChanges();

    mockImageSizes.set(['w300', 'w500']);
    fixture.detectChanges();

    // The component should pick the new last item 'w500'
    expect(component.imageURL()).toContain('w500');
  });
});
