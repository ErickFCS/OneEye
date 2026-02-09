import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alert } from '../alert/alert';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: Alert;
  let fixture: ComponentFixture<Alert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alert],
    }).compileComponents();

    fixture = TestBed.createComponent(Alert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the default message and error style', () => {
    // Check text content
    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.textContent).toContain('Hello');

    // Check default class (kind = 'error')
    const alertDiv = fixture.debugElement.query(By.css('.alert'));
    expect(alertDiv.nativeElement.classList).toContain('alert-error');
  });

  it('should update text when message signal changes', () => {
    // Act
    component.message.set('System Update Complete');
    fixture.detectChanges(); // Update the DOM

    // Assert
    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.textContent).toContain('System Update Complete');
  });

  it('should apply correct CSS class when kind signal changes', () => {
    // Act: Change to success
    component.kind.set('success');
    fixture.detectChanges();

    // Assert
    const alertDiv = fixture.debugElement.query(By.css('.alert'));
    expect(alertDiv.nativeElement.classList).toContain('alert-success');
    expect(alertDiv.nativeElement.classList).not.toContain('alert-error');
  });

  it('should handle undefined kind gracefully', () => {
    // Act: Set to undefined (should map to 'normal' -> '')
    component.kind.set(undefined);
    fixture.detectChanges();

    const alertDiv = fixture.debugElement.query(By.css('.alert'));

    // Assert: It should still have base classes, but no specific alert-type class
    expect(alertDiv.nativeElement.classList).toContain('alert');
    expect(alertDiv.nativeElement.classList).toContain('m-8');
    expect(alertDiv.nativeElement.classList).not.toContain('alert-error');
    expect(alertDiv.nativeElement.classList).not.toContain('alert-success');
  });

  it('should have the correct accessibility role', () => {
    const alertDiv = fixture.debugElement.query(By.css('.alert'));
    expect(alertDiv.attributes['role']).toBe('alert');
  });
});
