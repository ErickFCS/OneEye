import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Searchbar } from './searchbar';
import { Tmdb } from '../../services/tmdb';
import { TargetMovie } from '../../services/target-movie';
import { ViewportScroller } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Dropdown } from '../dropdown/dropdown';
import { of } from 'rxjs';
import { signal as signalCore } from '@angular/core';
import { Movie } from '../../types/movie';
import { By } from '@angular/platform-browser';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('SearchbarComponent', () => {
  let component: Searchbar;
  let fixture: ComponentFixture<Searchbar>;

  let lastSearchQuery: string | null = null;
  let lastScrollAnchor: string | null = null;
  let lastSelectedMovie: Movie | undefined = undefined;

  // Mock Data
  const MOCK_MOVIES: Movie[] = [
    { id: 101, title: 'Matrix', description: '', rating: 5, imageURLEnd: '/matrix.jpg' },
  ];

  beforeEach(async () => {
    // Reset trackers before each test
    lastSearchQuery = null;
    lastScrollAnchor = null;
    lastSelectedMovie = undefined;

    // TMDB Mock
    const mockTmdb = {
      imageSizes: signalCore(['w92', 'original']),
      search: (query: string) => {
        lastSearchQuery = query;
        return of(MOCK_MOVIES);
      },
      getImageURL: (size: string, end: string) => `/mock/${size}${end}`,
    };

    // TargetMovie Mock
    const fakeSignal: any = () => lastSelectedMovie;
    fakeSignal.set = (val: Movie) => {
      lastSelectedMovie = val;
    };

    const mockTargetMovieService = {
      targetMovie: fakeSignal,
    };

    const mockScroller = {
      scrollToAnchor: (anchor: string) => {
        lastScrollAnchor = anchor;
      },
    };

    await TestBed.configureTestingModule({
      imports: [Searchbar, ReactiveFormsModule, Dropdown],
      providers: [
        { provide: Tmdb, useValue: mockTmdb },
        { provide: TargetMovie, useValue: mockTargetMovieService },
        { provide: ViewportScroller, useValue: mockScroller },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Searchbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not search immediately (debounce check)', async () => {
    component.searchControl.setValue('Avatar');

    await delay(200);

    expect(lastSearchQuery).toBeNull();
  });

  it('should search after 400ms and update matches', async () => {
    component.searchControl.setValue('Matrix');
    await delay(450);

    expect(lastSearchQuery).toBe('Matrix');

    expect(component.matches().length).toBe(1);
    expect(component.matches()[0].title).toBe('Matrix');
  });

  it('should clear results if query is empty', async () => {
    component.matches.set(MOCK_MOVIES);

    component.searchControl.setValue('');
    await delay(450);

    expect(component.matches().length).toBe(0);
  });

  it('should handle item selection (click)', () => {
    const selectedMovie = MOCK_MOVIES[0];

    component.handleClick(selectedMovie);

    expect(lastSelectedMovie).toBe(selectedMovie);
    expect(lastScrollAnchor).toBe('middleSection');
  });

  it('should integrate with Dropdown component', async () => {
    component.searchControl.setValue('Test');
    await delay(450);

    fixture.detectChanges();

    const dropdown = fixture.debugElement.query(By.css('app-dropdown'));
    expect(dropdown).toBeTruthy();

    const dropdownInstance = dropdown.componentInstance;
    expect(dropdownInstance.matches().length).toBe(1);
  });
});
