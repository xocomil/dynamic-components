import { inject, Injectable } from '@angular/core';
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
import { WINDOW } from '../injection-tokens/window-injection.token';
import { AvailableDataSources } from '../models/available-datasources.model';
import { ChartType } from '../models/chart-type.model';
import { DashboardWidget } from '../models/dashboard-widget';
import { SaveWidgetsService } from './save-widgets.service';

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

  readonly #window = inject(WINDOW);
  readonly #saveWidgetsService = inject(SaveWidgetsService);

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
      tap(([, displayMode, widgets, oldWidgets]) => {
        this.#setEditMode(!displayMode);

        if (!displayMode) {
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

        this.#saveWidgets();
      })
    )
  );

  readonly #saveWidgets = this.effect((save$: Observable<void>) =>
    save$.pipe(
      withLatestFrom(this.widgets$),
      switchMap(([, widgets]) => this.#saveWidgetsService.saveWidgets(widgets))
    )
  );

  readonly add = this.updater((state) => {
    const widgetId = this.#window.crypto.randomUUID();

    return create(state, (draft) => {
      draft.widgets.push({
        id: widgetId,
        title: '',
        subTitle: '',
        chartType: ChartType.bar,
        dataSource: AvailableDataSources.hoursWorked,
      });
    });
  });

  readonly deleteWidgetById = this.updater((state, { id }: { id: string }) => {
    return create(state, (draft) => {
      draft.widgets = draft.widgets.filter((widget) => widget.id !== id);
    });
  });

  readonly updateTitle = this.updater(
    (state, { id, title }: { id: string; title: string }) => {
      return create(state, (draft) => {
        draft.widgets = draft.widgets.map((widget) => {
          if (widget.id === id) {
            widget.title = title;
          }

          return widget;
        });
      });
    }
  );

  readonly updateSubtitle = this.updater(
    (state, { id, subtitle }: { id: string; subtitle: string }) => {
      return create(state, (draft) => {
        draft.widgets = draft.widgets.map((widget) => {
          if (widget.id === id) {
            widget.subTitle = subtitle;
          }

          return widget;
        });
      });
    }
  );

  readonly updateDataSource = this.updater(
    (
      state,
      { id, dataSource }: { id: string; dataSource: AvailableDataSources }
    ) => {
      return create(state, (draft) => {
        draft.widgets = draft.widgets.map((widget) => {
          if (widget.id === id) {
            widget.dataSource = dataSource;
          }

          return widget;
        });
      });
    }
  );

  readonly updateChartType = this.updater(
    (state, { id, chartType }: { id: string; chartType: ChartType }) => {
      return create(state, (draft) => {
        draft.widgets = draft.widgets.map((widget) => {
          if (widget.id === id) {
            widget.chartType = chartType;
          }

          return widget;
        });
      });
    }
  );

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

  getWidgetFromId(
    id: string | undefined
  ): Observable<DashboardWidget | undefined> {
    return this.select((state) =>
      state.widgets.find((widget) => widget.id === id)
    );
  }
}
