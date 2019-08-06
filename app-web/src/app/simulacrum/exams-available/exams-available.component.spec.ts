import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsAvailableComponent } from './exams-available.component';

describe('ExamsAvailableComponent', () => {
  let component: ExamsAvailableComponent;
  let fixture: ComponentFixture<ExamsAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
