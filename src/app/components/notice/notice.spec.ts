import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notice } from './notice';
import { By } from '@angular/platform-browser';

describe('NoticeComponent', () => {
  let component: Notice;
  let fixture: ComponentFixture<Notice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notice]
    }).compileComponents();

    fixture = TestBed.createComponent(Notice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the default copyright text', () => {
    const p = fixture.debugElement.query(By.css('p'));

    // Check text content
    expect(p.nativeElement.textContent).toContain('@copyright 2025 - present');
  });

  it('should have the correct opacity class', () => {
    const p = fixture.debugElement.query(By.css('p'));

    // Verify styling class is applied
    expect(p.nativeElement.classList).toContain('opacity-75');
  });

  it('should update text when signal changes', () => {
    const newText = '© 2026 ErickFCS - All Rights Reserved';

    component.text.set(newText);
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toContain(newText);
  });
});
