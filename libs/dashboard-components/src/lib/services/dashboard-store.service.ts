import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { interval, NEVER, Observable, switchMap, tap } from 'rxjs';

export type DashboardState = {
  refreshIntervalSeconds: number;
};

const initialState = (): DashboardState => ({
  refreshIntervalSeconds: 10,
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

  constructor() {
    super(initialState());
  }

  refreshIntervalChange = this.effect((interval$: Observable<number>) =>
    interval$.pipe(
      tap((intervalSeconds) => this.#setRefreshIntervalSeconds(intervalSeconds))
    )
  );

  #setRefreshIntervalSeconds(refreshIntervalSeconds: number) {
    this.patchState({ refreshIntervalSeconds });
  }
}
