import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Theme } from './theme';
import { By } from '@angular/platform-browser';

describe('ThemeComponent', () => {
  let component: Theme;
  let fixture: ComponentFixture<Theme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Theme],
    }).compileComponents();

    fixture = TestBed.createComponent(Theme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct swap structure', () => {
    const label = fixture.debugElement.query(By.css('label'));

    // Check key classes that make the animation work
    expect(label.nativeElement.classList).toContain('swap');
    expect(label.nativeElement.classList).toContain('swap-rotate');
  });

  it('should have a theme controller checkbox with value "light"', () => {
    const input = fixture.debugElement.query(By.css('input[type="checkbox"]'));

    expect(input).toBeTruthy();
    expect(input.nativeElement.classList).toContain('theme-controller');
    expect(input.nativeElement.value).toBe('light');
  });

  it('should render the Sun icon (swap-on)', () => {
    // Find the svg that shows when swapped ON
    const sunSvg = fixture.debugElement.query(By.css('.swap-on'));
    expect(sunSvg).toBeTruthy();

    // Check the internal <use> tag
    const useTag = sunSvg.query(By.css('use'));
    expect(useTag.nativeElement.getAttribute('href')).toBe('#icon-sun');
  });

  it('should render the Moon icon (swap-off)', () => {
    // Find the svg that shows when swapped OFF
    const moonSvg = fixture.debugElement.query(By.css('.swap-off'));
    expect(moonSvg).toBeTruthy();

    const useTag = moonSvg.query(By.css('use'));
    expect(useTag.nativeElement.getAttribute('href')).toBe('#icon-moon');
  });
});
