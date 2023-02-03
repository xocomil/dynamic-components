import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { create } from 'mutative';
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
  oldWidgets: DashboardWidget[];
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
  oldWidgets: [],
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

  readonly #oldWidgets$ = this.select((state) => state.oldWidgets);

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
      withLatestFrom(this.editMode$, this.widgets$, this.#oldWidgets$),
      tap(([, editMode, widgets, oldWidgets]) => {
        this.#setEditMode(!editMode);

        if (!editMode) {
          this.#setOldWidgets(widgets);
        } else {
          this.#setOldWidgets([]);
          this.#setWidgets(oldWidgets);
        }
      })
    )
  );

  readonly save = this.effect((save$: Observable<void>) =>
    save$.pipe(
      tap(() => {
        this.#setEditMode(false);
      })
    )
  );

  readonly deleteWidgetById = this.updater((state, { id }: { id: string }) => {
    return create(state, (draft) => {
      draft.widgets = draft.widgets.filter((widget) => widget.id !== id);
    });
  });

  #setOldWidgets(oldWidgets: DashboardWidget[]): void {
    this.patchState({ oldWidgets });
  }

  #setWidgets(widgets: DashboardWidget[]): void {
    this.patchState({ widgets });
  }

  #setEditMode(editMode: boolean) {
    this.patchState({ editMode });
  }

  #setRefreshIntervalSeconds(refreshIntervalSeconds: number) {
    this.patchState({ refreshIntervalSeconds });
  }

  getWidgetFromId(id: string): Observable<DashboardWidget | undefined> {
    return this.select((state) =>
      state.widgets.find((widget) => widget.id === id)
    );
  }
}
