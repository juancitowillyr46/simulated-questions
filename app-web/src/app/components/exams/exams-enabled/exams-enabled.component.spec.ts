import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsEnabledComponent } from './exams-enabled.component';

describe('ExamsEnabledComponent', () => {
  let component: ExamsEnabledComponent;
  let fixture: ComponentFixture<ExamsEnabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsEnabledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsEnabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
