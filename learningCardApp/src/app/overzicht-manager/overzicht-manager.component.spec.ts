import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverzichtManagerComponent } from './overzicht-manager.component';

describe('OverzichtManagerComponent', () => {
  let component: OverzichtManagerComponent;
  let fixture: ComponentFixture<OverzichtManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverzichtManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverzichtManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
