import { Observable } from 'rxjs';

export type DataSource<T = any, X = any> = {
  data$: Observable<T[]>;
  x: (item: T) => X;
  y: ((item: T) => number) | ((item: T) => number)[];
  value: (item: T) => number;
  template: (item: T) => string;
  tickFormat: (value: X) => string;
};
