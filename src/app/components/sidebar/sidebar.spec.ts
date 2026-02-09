import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidebar } from './sidebar';
import { Avatar } from '../avatar/avatar';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar, Avatar]
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct drawer structure', () => {
    const drawer = fixture.debugElement.query(By.css('.drawer'));
    expect(drawer).toBeTruthy();

    // Check for the invisible toggle checkbox
    const checkbox = fixture.debugElement.query(By.css('input.drawer-toggle'));
    expect(checkbox).toBeTruthy();
    expect(checkbox.nativeElement.id).toBe('sidebar');
  });

  it('should link the label to the checkbox', () => {
    const label = fixture.debugElement.query(By.css('label.drawer-button'));
    expect(label.attributes['for']).toBe('sidebar');
  });

  it('should render the Avatar component inside the drawer button', () => {
    // Look for the child component tag
    const avatar = fixture.debugElement.query(By.css('app-avatar'));
    expect(avatar).toBeTruthy();
  });

  it('should render the side menu with correct items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('ul.menu li'));

    expect(menuItems.length).toBe(2);
    expect(menuItems[0].nativeElement.textContent).toContain('Account');
    expect(menuItems[1].nativeElement.textContent).toContain('Logout');
  });

  it('should have an accessible overlay to close the drawer', () => {
    const overlay = fixture.debugElement.query(By.css('.drawer-overlay'));

    expect(overlay.attributes['for']).toBe('sidebar');
    expect(overlay.attributes['aria-label']).toBe('close sidebar');
  });
});
