import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dropdown } from './dropdown';
import { By } from '@angular/platform-browser';
import { Movie } from '../../types/movie';


const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    description: 'A thief who steals corporate secrets...',
    rating: 5,
    imageURLEnd: 'inception.jpg',
    imageURL: '/img1.jpg'
  },
  {
    id: 2,
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole...',
    rating: 5,
    imageURLEnd: 'interstellar.jpg',
    imageURL: '/img2.jpg'
  },
  {
    id: 3,
    title: 'Dunkirk',
    description: 'Allied soldiers from Belgium...',
    rating: 4,
    imageURLEnd: 'dunkirk.jpg',
    imageURL: '/img3.jpg'
  },
  {
    id: 4,
    title: 'Tenet',
    description: 'Armed with only one word...',
    rating: 3,
    imageURLEnd: 'tenet.jpg',
    imageURL: '/img4.jpg'
  },
  {
    id: 5,
    title: 'Oppenheimer',
    description: 'The story of American scientist...',
    rating: 5,
    imageURLEnd: 'oppenheimer.jpg',
    imageURL: '/img5.jpg'
  },
  {
    id: 6,
    title: 'Memento',
    description: 'A man with short-term memory loss...',
    rating: 4,
    imageURLEnd: 'memento.jpg',
    imageURL: '/img6.jpg'
  },
];

describe('DropdownComponent', () => {
  let component: Dropdown;
  let fixture: ComponentFixture<Dropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown]
    }).compileComponents();

    fixture = TestBed.createComponent(Dropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render anything if matches are empty', () => {
    // Default is empty
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const topDiv = fixture.debugElement.query(By.css('.absolute'));

    expect(buttons.length).toBe(0);
    expect(topDiv).toBeNull(); // The decorative div shouldn't exist
  });

  it('should render a list of movies when input is provided', () => {
    fixture.componentRef.setInput('matches', [MOCK_MOVIES[0], MOCK_MOVIES[1]]);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);

    const firstButtonText = buttons[0].nativeElement.textContent;
    expect(firstButtonText).toContain('Inception');
  });

  it('should limit the display to 5 items', () => {
    fixture.componentRef.setInput('matches', MOCK_MOVIES);
    fixture.detectChanges();

    // Only 5 should render due to .slice(0, 5)
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(5);

    // Ensure the 6th item (Memento) is NOT there
    const allText = fixture.nativeElement.textContent;
    expect(allText).not.toContain('Memento');
  });

  it('should emit itemSelected when a movie is clicked', () => {
    // Setup input and spy on output
    fixture.componentRef.setInput('matches', [MOCK_MOVIES[0]]);
    fixture.detectChanges();

    let emittedMovie: Movie | undefined;
    // Subscribe to the output manually to verify emission
    component.itemSelected.subscribe((movie: Movie) => {
      emittedMovie = movie;
    });

    // Click the button
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    // Assert
    expect(emittedMovie).toEqual(MOCK_MOVIES[0]);
  });

  it('should render the decorative top div only when matches exist', () => {
    // Initially hidden
    expect(fixture.debugElement.query(By.css('.absolute'))).toBeNull();

    // Show when data exists
    fixture.componentRef.setInput('matches', [MOCK_MOVIES[0]]);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.absolute'))).not.toBeNull();
  });
});
