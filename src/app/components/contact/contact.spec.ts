import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct GitHub link', () => {
    const anchor = fixture.debugElement.query(By.css('a'));

    expect(anchor.attributes['href']).toBe('https://github.com/ErickFCS');
    expect(anchor.attributes['target']).toBe('_blank');
  });

  it('should display the username and email', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check specific elements text
    expect(compiled.textContent).toContain('ErickFCS');
    expect(compiled.textContent).toContain('erickfercs@gmail.com');
  });

  it('should render the GitHub icon svg', () => {
    const svg = fixture.debugElement.query(By.css('svg'));

    // Icon presence check
    expect(svg).toBeTruthy();
    expect(svg.attributes['width']).toBe('98');
    expect(svg.attributes['height']).toBe('96');
  });
});
