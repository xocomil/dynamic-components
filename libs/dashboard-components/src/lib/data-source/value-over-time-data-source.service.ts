import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en';
import { addDays, format } from 'date-fns';
import { interval, of, shareReplay, startWith, switchMap } from 'rxjs';
import { DataSource } from '../models/datasource';

type DataRecord = {
  index: number;
  date: Date;
  value: number;
};

const startDate = faker.date.recent(120);

@Injectable()
export class ValueOverTimeDataSourceService implements DataSource {
  readonly data$ = interval(4000).pipe(
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
