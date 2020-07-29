import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaPanelComponent } from './qa-panel.component';

describe('QaPanelComponent', () => {
  let component: QaPanelComponent;
  let fixture: ComponentFixture<QaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
