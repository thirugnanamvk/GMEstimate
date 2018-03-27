import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmCalculatorContainerComponent } from './gm-calculator-container.component';

describe('GmCalculatorContainerComponent', () => {
  let component: GmCalculatorContainerComponent;
  let fixture: ComponentFixture<GmCalculatorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmCalculatorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmCalculatorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
