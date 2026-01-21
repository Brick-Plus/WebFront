import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetneufComponent } from './setneuf.component';

describe('SetneufComponent', () => {
  let component: SetneufComponent;
  let fixture: ComponentFixture<SetneufComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetneufComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetneufComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
