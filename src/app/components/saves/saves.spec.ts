import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Saves } from './saves';
import { By } from '@angular/platform-browser';

describe('SavesComponent', () => {
  let component: Saves;
  let fixture: ComponentFixture<Saves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Saves]
    }).compileComponents();

    fixture = TestBed.createComponent(Saves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the SVG with default fill "none"', () => {
    const svg = fixture.debugElement.query(By.css('svg'));

    expect(svg.nativeElement.getAttribute('fill')).toBe('none');
  });

  it('should update fill color when signal changes', () => {
    component.iconFill.set('red');
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg.nativeElement.getAttribute('fill')).toBe('red');
  });

  it('should have the correct visual classes', () => {
    const svg = fixture.debugElement.query(By.css('svg'));
    const classes = svg.nativeElement.classList;

    expect(classes).toContain('size-10');
    expect(classes).toContain('drop-shadow-sm');
  });

  it('should contain the button wrapper', () => {
     const button = fixture.debugElement.query(By.css('button'));
     expect(button).toBeTruthy();
     expect(button.nativeElement.classList).toContain('block');
  });
});
