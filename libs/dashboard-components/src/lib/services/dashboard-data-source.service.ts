import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  StaticProvider,
} from '@angular/core';
import { HoursWorkedDataSourceService } from '../data-source/hours-worked-data-source.service';
import { SalesByPersonDataSourceService } from '../data-source/sales-by-person-data-source.service';
import { ValueOverTimeDataSourceService } from '../data-source/value-over-time-data-source.service';
import { AvailableDataSources } from '../models/available-datasources.model';
import { DataSource } from '../models/datasource';

@Injectable()
export class DashboardDataSourceService {
  #dataSourceCache = new Map<AvailableDataSources, DataSource>();
  #injector = inject(Injector);

  getProvider(dataSourceName: AvailableDataSources): StaticProvider {
    if (!this.#dataSourceCache.has(dataSourceName)) {
      const dataSource = this.#createDataSource(dataSourceName);

      this.#dataSourceCache.set(dataSourceName, dataSource);
    }

    return {
      provide: CHART_DATA_SOURCE,
      useFactory: () => this.#dataSourceCache.get(dataSourceName),
    };
  }

  #createDataSource(dataSourceName: AvailableDataSources): DataSource {
    switch (dataSourceName) {
      case 'hoursWorked':
        return this.#injector.get(HoursWorkedDataSourceService);
      case 'salesByPerson':
        return this.#injector.get(SalesByPersonDataSourceService);
      case 'valueOverTime':
        return this.#injector.get(ValueOverTimeDataSourceService);
    }

    throw new Error(`Unknown data source: ${dataSourceName}`);
  }
}

export const CHART_DATA_SOURCE = new InjectionToken<DataSource>(
  'ChartDataSource'
);
