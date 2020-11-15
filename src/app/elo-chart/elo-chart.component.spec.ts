import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EloChartComponent } from './elo-chart.component';

describe('EloChartComponent', () => {
  let component: EloChartComponent;
  let fixture: ComponentFixture<EloChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EloChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EloChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
