import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsQuestionsComponent } from './exams-questions.component';

describe('ExamsQuestionsComponent', () => {
  let component: ExamsQuestionsComponent;
  let fixture: ComponentFixture<ExamsQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
