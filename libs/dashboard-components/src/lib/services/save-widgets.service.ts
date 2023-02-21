import { inject, Injectable } from '@angular/core';
import { create } from 'mutative';
import { Observable, of } from 'rxjs';
import { z } from 'zod';
import { WINDOW } from '../injection-tokens/window-injection.token';
import { DashboardWidget } from '../models/dashboard-widget';
import { dashboardWidgetParser } from './../models/dashboard-widget';

@Injectable({
  providedIn: 'root',
})
export class SaveWidgetsService {
  readonly #window = inject(WINDOW);

  saveWidgets(widgets: DashboardWidget[]): Observable<boolean> {
    const versionedWidgets = widgets.map((widget) =>
      create(widget, (draft) => {
        draft.version = '1.0';
      })
    );

    const widgetString = JSON.stringify(versionedWidgets, null, 2);

    this.#window.localStorage.setItem('dashboard', widgetString);

    return of(true);
  }

  loadWidgets(): Observable<DashboardWidget[]> {
    const widgetString = this.#window.localStorage.getItem('dashboard');

    return of(this.#validateWidgets(widgetString));
  }

  #validateWidgets(widgetString?: string | null): DashboardWidget[] {
    if (!widgetString) {
      return [];
    }

    const parsedWidgets = JSON.parse(widgetString);

    const widgetsParser = z.array(dashboardWidgetParser);

    return widgetsParser.parse(parsedWidgets);
  }
}
