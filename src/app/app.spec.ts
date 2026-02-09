import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        // We only need the Router, as App uses <router-outlet>
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'movieSearcher' title`, () => {
    expect((component as any).title()).toEqual('movieSearcher');
  });

  it('should render the main layout structure', () => {
    // Router Outlet
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();

    // Navbar
    const navbar = fixture.debugElement.query(By.css('app-navbar'));
    expect(navbar).toBeTruthy();

    // Footer
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(footer).toBeTruthy();
  });

  it('should render all SVG definitions and icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verify the SVG block exists
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeTruthy();

    // Verify the Filter (by ID)
    const filter = compiled.querySelector('#filter-outline');
    expect(filter).toBeTruthy();

    // Verify Icons
    const sunIcon = compiled.querySelector('#icon-sun');
    const moonIcon = compiled.querySelector('#icon-moon');
    const oneEyeIcon = compiled.querySelector('#icon-one-eye');

    expect(sunIcon).toBeTruthy();
    expect(moonIcon).toBeTruthy();
    expect(oneEyeIcon).toBeTruthy();
  });
});
