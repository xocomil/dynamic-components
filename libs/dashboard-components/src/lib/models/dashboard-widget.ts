import { AvailableDataSources } from './available-datasources.model';
import { ChartType } from './chart-type.model';

export type DashboardWidget = {
  id: string;
  title: string;
  subTitle?: string;
  chartType: ChartType;
  dataSource: AvailableDataSources;
};
