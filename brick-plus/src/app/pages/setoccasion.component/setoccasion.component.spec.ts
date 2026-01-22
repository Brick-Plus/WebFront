import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetoccasionComponent } from './setoccasion.component';

describe('SetoccasionComponent', () => {
  let component: SetoccasionComponent;
  let fixture: ComponentFixture<SetoccasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetoccasionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetoccasionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
