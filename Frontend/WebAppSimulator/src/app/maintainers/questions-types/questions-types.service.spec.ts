import { TestBed } from '@angular/core/testing';

import { QuestionsTypesService } from './questions-types.service';

describe('QuestionsTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsTypesService = TestBed.get(QuestionsTypesService);
    expect(service).toBeTruthy();
  });
});
