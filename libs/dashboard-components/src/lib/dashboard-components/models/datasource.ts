import { Observable } from 'rxjs';

export type DataSource<T = any, X = any, Y = any> = {
  data$: Observable<T[]>;
  x: (item: T) => X;
  y: ((item: T) => Y) | ((item: T) => Y)[];
  template: (item: T) => string;
  tickFormat: (value: X) => string;
};
