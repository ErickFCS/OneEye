import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rating } from './rating';
import { By } from '@angular/platform-browser';

describe('RatingComponent', () => {
  let component: Rating;
  let fixture: ComponentFixture<Rating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rating],
    }).compileComponents();

    fixture = TestBed.createComponent(Rating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 10 star masks', () => {
    const stars = fixture.debugElement.queryAll(By.css('.mask'));
    expect(stars.length).toBe(10);
  });

  it('should activate correct number of stars', () => {
    fixture.componentRef.setInput('stars', 7);
    fixture.detectChanges();

    const stars = fixture.debugElement.queryAll(By.css('.mask'));

    // The 7th star (index 6) should be active
    expect(stars[6].nativeElement.getAttribute('aria-current')).toBe('true');

    // The 8th star (index 7) should be inactive
    expect(stars[7].nativeElement.getAttribute('aria-current')).toBe('false');
  });

  it('should activate all stars when rating is max', () => {
    fixture.componentRef.setInput('stars', 10);
    fixture.detectChanges();

    const stars = fixture.debugElement.queryAll(By.css('.mask'));

    // Verify every single star is "true"
    stars.forEach((star) => {
      expect(star.nativeElement.getAttribute('aria-current')).toBe('true');
    });
  });

  it('should append custom class string correctly', () => {
    fixture.componentRef.setInput('classString', 'my-custom-margin');
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.rating'));

    // Check that base classes exist
    expect(container.nativeElement.classList).toContain('rating');
    expect(container.nativeElement.classList).toContain('rating-half');

    // Check that custom class was added
    expect(container.nativeElement.classList).toContain('my-custom-margin');
  });
});
