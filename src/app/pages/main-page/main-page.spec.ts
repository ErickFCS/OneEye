import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPage } from './main-page';
import { Tmdb } from '../../services/tmdb';
import { TargetMovie } from '../../services/target-movie';
import { ViewportScroller } from '@angular/common';
import { signal as signalCore } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MainPageComponent', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async () => {
    // Mock TMDB
    const mockTmdb = {
      imageSizes: signalCore(['original']),
      getImageURL: (size: string, end: string) => `mock-url/${end}`,
      search: () => {},
    };

    // Mock TargetMovie
    const mockTargetMovieService = {
      targetMovie: signalCore(undefined),
    };

    // Mock ViewportScroller
    const mockScroller = {
      scrollToAnchor: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [MainPage],
      providers: [
        // Provide the mocks so the children don't crash
        { provide: Tmdb, useValue: mockTmdb },
        { provide: TargetMovie, useValue: mockTargetMovieService },
        { provide: ViewportScroller, useValue: mockScroller },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the main page', () => {
    expect(component).toBeTruthy();
  });

  it('should render all major sections', () => {
    const hero = fixture.debugElement.query(By.css('app-hero'));
    const title = fixture.debugElement.query(By.css('app-title'));
    const searchbar = fixture.debugElement.query(By.css('app-searchbar'));
    const middle = fixture.debugElement.query(By.css('app-middle'));

    expect(hero).toBeTruthy();
    expect(title).toBeTruthy();
    expect(searchbar).toBeTruthy();
    expect(middle).toBeTruthy();
  });

  it('should have the correct ID on the middle section', () => {
    const middle = fixture.debugElement.query(By.css('app-middle'));
    expect(middle.nativeElement.getAttribute('id')).toBe('middleSection');
  });

  it('should position the searchbar correctly', () => {
    const searchbar = fixture.debugElement.query(By.css('app-searchbar'));
    const classes = searchbar.nativeElement.className;
    expect(classes).toContain('absolute');
    expect(classes).toContain('left-[50dvw]');
  });
});
