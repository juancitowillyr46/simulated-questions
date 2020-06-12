import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsExamComponent } from './students-exam.component';

describe('StudentsExamComponent', () => {
  let component: StudentsExamComponent;
  let fixture: ComponentFixture<StudentsExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
