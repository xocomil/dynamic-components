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
import { DashboardWidget } from '../../models/dashboard-widget';
import { DashboardDataSourceService } from '../../services/dashboard-data-source.service';
import { getChart } from '../../services/get-component';

@Component({
  selector: 'dash-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, LetModule],
  template: ` <mat-card>
    <ng-content></ng-content>
    <mat-card-content>
      <ng-container #anchor />
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @Input() set widget(widget: DashboardWidget | undefined) {
    this.#loadWidgetData(widget);
  }

  @ViewChild('anchor', { static: true, read: ViewContainerRef })
  anchor!: ViewContainerRef;

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
