import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMapDialogComponent } from './new-map-dialog.component';

describe('NewMapDialogComponent', () => {
  let component: NewMapDialogComponent;
  let fixture: ComponentFixture<NewMapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
