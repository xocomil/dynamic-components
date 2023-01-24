import { Type } from '@angular/core';
import { BarChartComponent } from '../dashboard-components/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../dashboard-components/donut-chart/donut-chart.component';
import { LineChartComponent } from '../dashboard-components/line-chart/line-chart.component';
import { ChartType } from '../models/chart-type.model';

type Chart = BarChartComponent | LineChartComponent | DonutChartComponent;

export const getChart = (
  chartType: ChartType
): Promise<Type<Chart>> | undefined => {
  switch (chartType) {
    case ChartType.bar:
      return import(
        '../dashboard-components/bar-chart/bar-chart.component'
      ).then((m) => m.BarChartComponent);
    case ChartType.line:
      return import(
        '../dashboard-components/line-chart/line-chart.component'
      ).then((m) => m.LineChartComponent);
    case ChartType.pie:
      return import(
        '../dashboard-components/donut-chart/donut-chart.component'
      ).then((m) => m.DonutChartComponent);
  }

  return undefined;
};
