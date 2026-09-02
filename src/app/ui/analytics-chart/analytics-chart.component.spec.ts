import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsChartComponent } from './analytics-chart.component';
import { ComponentRef } from '@angular/core';

describe('AnalyticsChartComponent', () => {
  let component: AnalyticsChartComponent;
  let componentRef: ComponentRef<AnalyticsChartComponent>;
  let fixture: ComponentFixture<AnalyticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
