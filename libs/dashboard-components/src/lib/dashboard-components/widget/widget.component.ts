import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LetModule } from '@ngrx/component';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { DashboardWidget } from '../../models/dashboard-widget';
import { DashboardDataSourceService } from '../../services/dashboard-data-source.service';
import { DashboardStoreService } from '../../services/dashboard-store.service';
import { getChart } from '../../services/get-component';

@Component({
  selector: 'dash-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, LetModule],
  template: ` <mat-card>
    <mat-card-header *ngrxLet="widget$ as widget">
      <mat-card-title>
        {{ widget?.title }}
      </mat-card-title>
      <mat-card-subtitle *ngIf="widget?.subTitle">
        {{ widget?.subTitle }}
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <ng-container #anchor />
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  #widgetId?: string;
  @Input() get widgetId(): string | undefined {
    return this.#widgetId;
  }
  set widgetId(widgetId: string | undefined) {
    this.#widgetId = widgetId;

    this.#widgetId$.next(widgetId);
  }

  #widgetId$ = new BehaviorSubject<string | undefined>(undefined);

  protected widget$ = this.#widgetId$.pipe(
    filter(Boolean),
    switchMap((widgetId) => {
      return this.#dashboardStoreService.getWidgetFromId(widgetId);
    }),
    tap((widget) => {
      void this.#loadWidgetData(widget);
    })
  );

  @ViewChild('anchor', { static: true, read: ViewContainerRef })
  anchor!: ViewContainerRef;

  readonly #dashboardStoreService = inject(DashboardStoreService);
  readonly #injector = inject(Injector);
  readonly #dashboardDataService = inject(DashboardDataSourceService);

  async #loadWidgetData(widget: DashboardWidget | undefined) {
    if (!widget?.dataSource) return;

    const chart = await getChart(widget.chartType);

    if (chart) {
      this.anchor.clear();

      const component = this.anchor.createComponent(chart, {
        injector: Injector.create({
          providers: [
            this.#dashboardDataService.getProvider(widget.dataSource),
          ],
          parent: this.#injector,
        }),
      });

      component?.changeDetectorRef.detectChanges();
    }
  }
}
