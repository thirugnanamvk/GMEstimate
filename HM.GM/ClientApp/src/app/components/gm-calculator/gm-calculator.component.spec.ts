import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmCalculatorComponent } from './gm-calculator.component';

describe('GmCalculatorComponent', () => {
  let component: GmCalculatorComponent;
  let fixture: ComponentFixture<GmCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
