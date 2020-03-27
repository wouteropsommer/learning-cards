import { TestBed } from '@angular/core/testing';

import { CardSetService } from './card-set.service';

describe('CardSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardSetService = TestBed.get(CardSetService);
    expect(service).toBeTruthy();
  });
});
