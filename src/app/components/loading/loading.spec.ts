import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loading } from './loading';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: Loading;
  let fixture: ComponentFixture<Loading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loading],
    }).compileComponents();

    fixture = TestBed.createComponent(Loading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the spinner with correct classes', () => {
    const spinner = fixture.debugElement.query(By.css('span'));

    expect(spinner).toBeTruthy();

    // Check if the classes are present
    const classes = spinner.nativeElement.classList;
    expect(classes).toContain('loading');
    expect(classes).toContain('loading-spinner');
    expect(classes).toContain('loading-xl');
  });
});
