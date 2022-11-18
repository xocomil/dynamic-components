import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../../models/user.model';

export interface DynamicHostState {
  user: User;
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
