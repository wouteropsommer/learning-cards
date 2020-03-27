import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameMapDialogComponent } from './rename-map-dialog.component';

describe('RenameMapDialogComponent', () => {
  let component: RenameMapDialogComponent;
  let fixture: ComponentFixture<RenameMapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
