import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { Theme } from '../theme/theme';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, Theme]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the nav element with correct styling', () => {
    const nav = fixture.debugElement.query(By.css('nav'));

    // Verify layout classes
    expect(nav.nativeElement.classList).toContain('w-full');
    expect(nav.nativeElement.classList).toContain('flex');
    expect(nav.nativeElement.classList).toContain('justify-end');

    // Verify the specific background color
    expect(nav.nativeElement.classList).toContain('bg-[#0000]');
  });

  it('should render the Theme component inside', () => {
    const themeComponent = fixture.debugElement.query(By.css('app-theme'));
    expect(themeComponent).toBeTruthy();
  });
});
