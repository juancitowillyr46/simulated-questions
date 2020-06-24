import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTypesComponent } from './questions-types.component';

describe('QuestionsTypesComponent', () => {
  let component: QuestionsTypesComponent;
  let fixture: ComponentFixture<QuestionsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
