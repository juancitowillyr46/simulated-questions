import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsMainComponent } from './students-main.component';

describe('UsersMainComponent', () => {
  let component: StudentsMainComponent;
  let fixture: ComponentFixture<StudentsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
