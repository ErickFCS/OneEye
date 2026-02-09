import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Link } from './link';
import { By } from '@angular/platform-browser';

describe('LinkComponent', () => {
  let component: Link;
  let fixture: ComponentFixture<Link>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Link]
    }).compileComponents();

    fixture = TestBed.createComponent(Link);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default text and href', () => {
    const anchor = fixture.debugElement.query(By.css('a'));

    expect(anchor.nativeElement.textContent).toContain('Click Here');

    // Note: We use getAttribute to verify the raw string value
    expect(anchor.nativeElement.getAttribute('href')).toBe('www.google.com');
  });

  it('should update text when text signal changes', () => {
    component.text.set('Read More');
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.textContent).toContain('Read More');
  });

  it('should update href when linkURL signal changes', () => {
    const newUrl = 'https://angular.dev';

    component.linkURL.set(newUrl);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.getAttribute('href')).toBe(newUrl);
  });
});
