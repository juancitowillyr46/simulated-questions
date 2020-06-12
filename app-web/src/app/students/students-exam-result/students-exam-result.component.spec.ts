import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsExamResultComponent } from './students-exam-result.component';

describe('StudentsExamResultComponent', () => {
  let component: StudentsExamResultComponent;
  let fixture: ComponentFixture<StudentsExamResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsExamResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
