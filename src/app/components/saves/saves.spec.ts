import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saves } from './saves';

describe('Saves', () => {
  let component: Saves;
  let fixture: ComponentFixture<Saves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Saves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Saves);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
