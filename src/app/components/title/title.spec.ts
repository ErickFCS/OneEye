import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from './title';
import { By } from '@angular/platform-browser';

describe('TitleComponent', () => {
  let component: Title;
  let fixture: ComponentFixture<Title>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Title]
    }).compileComponents();

    fixture = TestBed.createComponent(Title);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct title text', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));

    expect(h1.nativeElement.textContent).toContain('One Eye');
    expect(h1.nativeElement.classList).toContain('uppercase');
  });

  it('should render the correct icon via <use>', () => {
    const svg = fixture.debugElement.query(By.css('svg'));
    const useTag = svg.query(By.css('use'));

    // Ensure we are pointing to the correct icon ID
    expect(useTag.nativeElement.getAttribute('href')).toBe('#icon-one-eye');
  });

  it('should preserve the 3D hover structure', () => {
    // The double slash is to scape the colon
    const wrapper = fixture.debugElement.query(By.css('.sm\\:hover-3d'));
    expect(wrapper).toBeTruthy();

    const allDivs = fixture.debugElement.queryAll(By.css('div > div'));

    // Expect at least the 8 decoration divs
    expect(allDivs.length).toBeGreaterThanOrEqual(8);
  });
});
