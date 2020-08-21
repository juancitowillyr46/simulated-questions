import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacrumComponent } from './simulacrum.component';

describe('SimulacrumComponent', () => {
  let component: SimulacrumComponent;
  let fixture: ComponentFixture<SimulacrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
