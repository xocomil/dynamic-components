import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en';
import { addDays, format } from 'date-fns';
import { of, shareReplay, startWith, switchMap } from 'rxjs';
import { DataSource } from '../models/datasource';
import { DashboardStoreService } from '../services/dashboard-store.service';

type DataRecord = {
  index: number;
  date: Date;
  value: number;
};

const startDate = faker.date.recent(120);

@Injectable()
export class ValueOverTimeDataSourceService implements DataSource {
  #dashboardStoreService = inject(DashboardStoreService);

  readonly data$ = this.#dashboardStoreService.refresh$.pipe(
    startWith(0),
    switchMap(() =>
      of(
        Array(6)
          .fill('')
          .map((_, index) => ({
            index,
            date: addDays(startDate, index),
            value: faker.datatype.float({ min: 65, max: 100, precision: 2 }),
          }))
      )
    ),
    shareReplay()
  );

  x = (d: DataRecord) => d.index;
  y = (d: DataRecord) => d.value;
  value = (d: DataRecord) => d.value;

  readonly template = (dataRecord: DataRecord) => {
    return `${format(dataRecord.date, 'MMM-dd-yy')}: $${dataRecord.value}`;
  };

  tickFormat(value: number): string {
    return value.toString();
  }
}
