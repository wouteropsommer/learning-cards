import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardsetComponent } from './create-cardset.component';

describe('CreateCardsetComponent', () => {
  let component: CreateCardsetComponent;
  let fixture: ComponentFixture<CreateCardsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCardsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
