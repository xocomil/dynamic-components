import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WINDOW } from '../injection-tokens/window-injection.token';
import { DashboardWidget } from '../models/dashboard-widget';

@Injectable({
  providedIn: 'root',
})
export class SaveWidgetsService {
  readonly #window = inject(WINDOW);

  saveWidgets(widgets: DashboardWidget[]): Observable<boolean> {
    const widgetString = JSON.stringify(widgets, null, 2);

    this.#window.localStorage.setItem('dashboard', widgetString);

    return of(true);
  }
}
