import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, map, Observable, tap, withLatestFrom } from 'rxjs';
import { AvailableDataSources } from '../models/available-datasources.model';
import { ChartType } from '../models/chart-type.model';
import { DashboardWidget } from './../models/dashboard-widget';
import { DashboardStoreService } from './dashboard-store.service';

type WidgetState = {
  widgetId?: string;
  currentWidget?: DashboardWidget;
};

const initialState = (): WidgetState => ({});

@Injectable()
export class WidgetStoreService extends ComponentStore<WidgetState> {
  readonly #dashboardStore = inject(DashboardStoreService);

  readonly widgetId$ = this.select((state) => state.widgetId);
  readonly currentWidget$ = this.select((state) => state.currentWidget);

  constructor() {
    super(initialState());
  }

  readonly setWidgetId = this.effect(
    (widgetId$: Observable<string | undefined>) =>
      widgetId$.pipe(
        tap((id) => {
          this.#setWidgetId(id);

          this.#getCurrentWidget(id);
        })
      )
  );

  readonly deleteWidget = this.effect((delete$: Observable<void>) =>
    delete$.pipe(
      withLatestFrom(this.widgetId$),
      tap(([, id]) => {
        if (id) {
          this.#dashboardStore.deleteWidgetById({ id });
        }
      })
    )
  );

  readonly titleChanged = this.effect((title$: Observable<string>) =>
    title$.pipe(
      withLatestFrom(this.widgetId$),
      filterNullIds(),
      tap(([title, id]) => {
        this.#dashboardStore.updateTitle({ id, title });
      })
    )
  );

  readonly subtitleChanged = this.effect((subtitle$: Observable<string>) =>
    subtitle$.pipe(
      withLatestFrom(this.widgetId$),
      filterNullIds(),
      tap(([subtitle, id]) => {
        this.#dashboardStore.updateSubtitle({
          id,
          subtitle,
        });
      })
    )
  );

  readonly dataSourceChanged = this.effect(
    (dataSource$: Observable<AvailableDataSources>) =>
      dataSource$.pipe(
        withLatestFrom(this.widgetId$),
        filterNullIds(),
        tap(([dataSource, id]) => {
          this.#dashboardStore.updateDataSource({ id, dataSource });
        })
      )
  );

  readonly chartTypeChanged = this.effect((chartType$: Observable<ChartType>) =>
    chartType$.pipe(
      withLatestFrom(this.widgetId$),
      filterNullIds(),
      tap(([chartType, id]) => {
        this.#dashboardStore.updateChartType({ id, chartType });
      })
    )
  );

  #setWidgetId(widgetId: string | undefined) {
    this.patchState({ widgetId });
  }

  #getCurrentWidget(widgetId: string | undefined) {
    const currentWidget$ = this.#dashboardStore
      .getWidgetFromId(widgetId)
      .pipe(map((widget) => ({ currentWidget: widget })));

    this.patchState(currentWidget$);
  }
}

const isIdDefined = <T>(
  titleAndId: [T, string | undefined]
): titleAndId is [T, string] => {
  if (!titleAndId[1]) {
    console.error('Widget id is not set.');

    return false;
  }

  return true;
};

const filterNullIds = () => filter(isIdDefined);
