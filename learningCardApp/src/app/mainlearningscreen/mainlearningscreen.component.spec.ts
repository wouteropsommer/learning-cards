import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainlearningscreenComponent } from './mainlearningscreen.component';

describe('MainlearningscreenComponent', () => {
  let component: MainlearningscreenComponent;
  let fixture: ComponentFixture<MainlearningscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainlearningscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainlearningscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
