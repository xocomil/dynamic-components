import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/en';
import { of, shareReplay, startWith, switchMap } from 'rxjs';
import { DataSource } from '../models/datasource';
import { DashboardStoreService } from '../services/dashboard-store.service';

type DataRecord = {
  person: string;
  id: number;
  hoursWorked: number;
  salesMade: number;
};

@Injectable()
export class SalesByPersonDataSourceService implements DataSource {
  #dashboardStoreService = inject(DashboardStoreService);

  readonly data$ = this.#dashboardStoreService.refresh$.pipe(
    startWith(0),
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
    ),
    shareReplay()
  );

  x = (d: DataRecord) => d.id;
  y = [(d: DataRecord) => d.hoursWorked, (d: DataRecord) => d.salesMade];

  value = () => {
    throw new Error('Not allowed');
  };

  readonly template = (dataRecord: DataRecord) => {
    return `${dataRecord.person}: ${dataRecord.salesMade} in ${dataRecord.hoursWorked} hour(s)`;
  };

  tickFormat(value: number): string {
    return value.toString();
  }
}
