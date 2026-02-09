import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { Contact } from '../contact/contact';
import { Notice } from '../notice/notice';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer, Contact, Notice],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child components (Contact and Notice)', () => {
    const contact = fixture.debugElement.query(By.css('app-contact'));
    const notice = fixture.debugElement.query(By.css('app-notice'));

    expect(contact).toBeTruthy();
    expect(notice).toBeTruthy();
  });

  it('should have the correct layout classes', () => {
    const footer = fixture.debugElement.query(By.css('footer'));

    expect(footer.nativeElement.classList).toContain('flex');
    expect(footer.nativeElement.classList).toContain('sm:flex-row');
    expect(footer.nativeElement.classList).toContain('bg-(--color-base-300)');
  });

  it('should render the "Powered By" section with correct link', () => {
    const link = fixture.debugElement.query(By.css('footer > div:last-child > a'));

    const textP = fixture.debugElement.query(By.css('footer > div:last-child > p'));
    expect(textP.nativeElement.textContent).toContain('powered by:');

    // Now check the TMDB link attributes
    expect(link.attributes['href']).toBe('https://www.themoviedb.org');
    expect(link.attributes['target']).toBe('_blank');
  });

  it('should display the TMDB logo svg', () => {
    const svg = fixture.debugElement.query(By.css('a > svg'));

    expect(svg).toBeTruthy();
    expect(svg.nativeElement.classList).toContain('size-24');
    expect(svg.attributes['viewBox']).toBe('0 0 185.04 133.4');
  });
});
