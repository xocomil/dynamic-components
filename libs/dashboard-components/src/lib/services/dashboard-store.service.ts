import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  interval,
  NEVER,
  Observable,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AvailableDataSources } from '../models/available-datasources.model';
import { ChartType } from '../models/chart-type.model';
import { DashboardWidget } from '../models/dashboard-widget';

export type DashboardState = {
  refreshIntervalSeconds: number;
  editMode: boolean;
  widgets: DashboardWidget[];
};

const initialState = (): DashboardState => ({
  refreshIntervalSeconds: 10,
  editMode: false,
  widgets: [
    {
      id: '1',
      title: 'Hours Worked',
      subTitle: 'How busy were you?',
      chartType: ChartType.bar,
      dataSource: AvailableDataSources.hoursWorked,
    },
    {
      id: '2',
      title: 'Sales by Person',
      subTitle: 'How sold the most?',
      chartType: ChartType.bar,
      dataSource: AvailableDataSources.salesByPerson,
    },
    {
      id: '3',
      title: 'Value Over Time',
      subTitle: 'Watch things change',
      chartType: ChartType.line,
      dataSource: AvailableDataSources.valueOverTime,
    },
    {
      id: '4',
      title: 'Hours Worked',
      subTitle: 'Mmmmmmmgghgmm donuts...',
      chartType: ChartType.pie,
      dataSource: AvailableDataSources.hoursWorked,
    },
  ],
});

@Injectable()
export class DashboardStoreService extends ComponentStore<DashboardState> {
  readonly refreshIntervalSeconds$ = this.select(
    (state) => state.refreshIntervalSeconds
  );
  readonly refresh$ = this.refreshIntervalSeconds$.pipe(
    switchMap((refreshIntervalSeconds) => {
      if (refreshIntervalSeconds === 0) {
        return NEVER;
      }

      return interval(refreshIntervalSeconds * 1000);
    })
  );

  readonly editMode$ = this.select((state) => state.editMode);

  readonly widgets$ = this.select((state) => state.widgets);

  constructor() {
    super(initialState());
  }

  refreshIntervalChange = this.effect((interval$: Observable<number>) =>
    interval$.pipe(
      tap((intervalSeconds) => this.#setRefreshIntervalSeconds(intervalSeconds))
    )
  );

  toggleEditMode = this.effect((toggle$: Observable<void>) =>
    toggle$.pipe(
      withLatestFrom(this.editMode$),
      tap(([, editMode]) => {
        this.#setEditMode(!editMode);
      })
    )
  );

  #setEditMode(editMode: boolean) {
    this.patchState({ editMode });
  }

  #setRefreshIntervalSeconds(refreshIntervalSeconds: number) {
    this.patchState({ refreshIntervalSeconds });
  }
}
