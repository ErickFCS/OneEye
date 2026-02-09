import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Rating } from '../rating/rating';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card, Rating],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial movie details', () => {
    const h3 = fixture.debugElement.query(By.css('h3.card-title'));
    const img = fixture.debugElement.query(By.css('img'));

    expect(h3.nativeElement.textContent).toContain('Movie title');
    expect(img.nativeElement.getAttribute('src')).toContain('photo-1606107557195');
  });

  it('should pass the correct star count to the Rating component', () => {
    const ratingDebugEl = fixture.debugElement.query(By.directive(Rating));

    expect(ratingDebugEl).toBeTruthy();

    // Verify the Input signal received the value 4
    const ratingInstance = ratingDebugEl.componentInstance as Rating;
    expect(ratingInstance.stars()).toBe(4);
  });

  describe('Description Truncation (Show More / Show Less)', () => {
    it('should show truncated text and "Show More" button by default', () => {
      const p = fixture.debugElement.query(By.css('p'));
      expect(p.nativeElement.classList).toContain('line-clamp-1');

      // "Show More" button exists
      const showMoreBtn = fixture.debugElement.query(By.css('button'));
      expect(showMoreBtn.nativeElement.textContent).toContain('show more');
    });

    it('should expand text and remove button when "Show More" is clicked', () => {
      const showMoreBtn = fixture.debugElement.query(By.css('button'));
      showMoreBtn.nativeElement.click();

      fixture.detectChanges();

      const p = fixture.debugElement.query(By.css('p'));
      expect(p.nativeElement.classList).not.toContain('line-clamp-1');

      const btnAfterClick = fixture.debugElement.query(By.css('button'));
      expect(btnAfterClick).toBeNull();
    });

    it('should toggle back to truncated when "show less" span is clicked', () => {
      // Start in expanded state (linesClamped = false)
      component.linesClamped.set(false);
      fixture.detectChanges();

      // Click the "show less"
      const showLessSpan = fixture.debugElement.query(By.css('span.text-right'));
      showLessSpan.nativeElement.click();

      fixture.detectChanges();

      const p = fixture.debugElement.query(By.css('p'));
      expect(p.nativeElement.classList).toContain('line-clamp-1');
    });
  });
});
