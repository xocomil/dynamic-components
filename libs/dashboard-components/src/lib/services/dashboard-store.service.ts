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

export type DashboardState = {
  refreshIntervalSeconds: number;
  editMode: boolean;
};

const initialState = (): DashboardState => ({
  refreshIntervalSeconds: 10,
  editMode: false,
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
