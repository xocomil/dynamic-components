import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface DynamicHostState {
  user: { firstName: string; lastName: string; age: number };
}

const initialState = () => ({
  user: {
    firstName: 'Jason',
    lastName: 'Warner',
    age: 100,
  },
});

@Injectable()
export class DynamicHostStore extends ComponentStore<DynamicHostState> {
  readonly user$ = this.select((state) => state.user);

  constructor() {
    super(initialState());
  }
}
