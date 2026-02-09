import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';
import { By } from '@angular/platform-browser';

describe('AvatarComponent', () => {
  let component: Avatar;
  let fixture: ComponentFixture<Avatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatar],
    }).compileComponents();

    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the default avatar image', () => {
    const img = fixture.debugElement.query(By.css('img'));

    // Check the actual src attribute value in the HTML
    expect(img.nativeElement.getAttribute('src')).toBe('/avatar.png');
  });

  it('should update image src when signal changes', () => {
    const newUrl = 'https://example.com/user-123.jpg';

    component.avatarURL.set(newUrl);
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.getAttribute('src')).toBe(newUrl);
  });

  it('should have correct styling classes', () => {
    const avatarWrapper = fixture.debugElement.query(By.css('.avatar'));
    const innerWrapper = fixture.debugElement.query(By.css('.rounded-full'));

    expect(avatarWrapper).toBeTruthy();
    expect(innerWrapper).toBeTruthy();
    expect(avatarWrapper.nativeElement.classList).toContain('w-full');
  });
});
