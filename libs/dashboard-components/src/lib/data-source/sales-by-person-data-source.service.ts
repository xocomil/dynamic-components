import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en';
import { interval, of, switchMap } from 'rxjs';
import { DataSource } from '../models/datasource';

type DataRecord = {
  person: string;
  id: number;
  hoursWorked: number;
  salesMade: number;
};

@Injectable()
export class SalesByPersonDataSourceService implements DataSource {
  readonly data$ = interval(3000).pipe(
    switchMap(() =>
      of(
        Array(6)
          .fill('')
          .map((_, index) => ({
            person: faker.name.fullName(),
            id: index + 1,
            hoursWorked: faker.datatype.number({ min: 0, max: 40 }),
            salesMade: faker.datatype.number({ min: 0, max: 100 }),
          }))
      )
    )
  );

  x = (d: DataRecord) => d.id;
  y = [(d: DataRecord) => d.hoursWorked, (d: DataRecord) => d.salesMade];

  readonly template = (dataRecord: DataRecord) => {
    return `${dataRecord.person}: ${dataRecord.salesMade} in ${dataRecord.hoursWorked} hour(s)`;
  };

  tickFormat(value: number): string {
    return value.toString();
  }
}
