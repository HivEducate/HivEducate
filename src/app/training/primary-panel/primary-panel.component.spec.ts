import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryPanelComponent } from './primary-panel.component';

describe('PrimaryPanelComponent', () => {
  let component: PrimaryPanelComponent;
  let fixture: ComponentFixture<PrimaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
