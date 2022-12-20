import { Injectable, InjectionToken } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en';
import { interval, of, switchMap } from 'rxjs';
import { DataSource } from '../models/datasource';

type DataRecord = {
  x: number;
  y: number;
};

const dayOfWeekMap = new Map<number, string>([
  [1, 'Mon'],
  [2, 'Tue'],
  [3, 'Wed'],
  [4, 'Thu'],
  [5, 'Fri'],
  [6, 'Sat'],
  [7, 'Sun'],
]);

export const BAR_CHART_DATASOURCE_SERVICE = new InjectionToken<DataSource>(
  'BarChartDatasourceService'
);

@Injectable()
export class HoursWorkedDataSourceService implements DataSource {
  readonly data$ = interval(5000).pipe(
    switchMap(() =>
      of(
        Array(7)
          .fill('')
          .map((_, index) => ({
            x: index + 1,
            y: faker.datatype.number({ min: 0, max: 12 }),
          }))
      )
    )
  );

  x = (d: DataRecord) => d.x;
  y = (d: DataRecord) => d.y;

  readonly template = (dataRecord: DataRecord) => {
    return `${this.tickFormat(dataRecord.x)}: ${dataRecord.y} hour(s)`;
  };

  tickFormat(value: number): string {
    return dayOfWeekMap.get(value) ?? value.toString();
  }
}
