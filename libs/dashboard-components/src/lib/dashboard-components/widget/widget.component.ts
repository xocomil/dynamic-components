import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  Injector,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushModule } from '@ngrx/component';
import { HoursWorkedDataSourceService } from '../../data-source/hours-worked-data-source.service';
import { AvailableDataSources } from '../../models/available-datasources.model';
import { ChartType } from '../../models/chart-type.model';
import { DataSource } from '../../models/datasource';
import { DashboardStoreService } from '../../services/dashboard-store.service';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { DynamicHostDirective } from './dynamic-host.directive';

type Chart = BarChartComponent | LineChartComponent | DonutChartComponent;

@Component({
  selector: 'dash-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PushModule,
    DynamicHostDirective,
  ],
  template: ` <mat-card>
    <mat-card-actions *ngIf="editMode$ | ngrxPush" [@buttonFade]>
      <button mat-icon-button [@buttonFade]>
        <mat-icon fontIcon="edit" />
      </button>
      <button mat-icon-button [@buttonFade]>
        <mat-icon fontIcon="delete" />
      </button>
    </mat-card-actions>
    <mat-card-header>
      <mat-card-title>
        {{ title }}
      </mat-card-title>
      <mat-card-subtitle *ngIf="subTitle">
        {{ subTitle }}
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <ng-container #anchor />
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('buttonFade', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms ease', style({ height: '*' })),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class WidgetComponent implements OnInit {
  @Input() title = 'My Widget';
  @Input() subTitle?: string;
  @Input() dataSource?: AvailableDataSources;
  @Input() chartType: ChartType = ChartType.bar;

  @ViewChild('anchor', { static: true, read: ViewContainerRef })
  anchor!: ViewContainerRef;

  readonly #dashboardStoreService = inject(DashboardStoreService);
  readonly #injector = inject(Injector);

  protected readonly editMode$ = this.#dashboardStoreService.editMode$;

  async ngOnInit(): Promise<void> {
    if (!this.dataSource) return;

    const chart = await this.#getChart();

    if (chart) {
      this.anchor.clear();

      const component = this.anchor.createComponent(chart, {
        injector: Injector.create({
          providers: [
            {
              provide: CHART_DATA_SOURCE,
              useFactory: () => new HoursWorkedDataSourceService(),
            },
          ],
          parent: this.#injector,
        }),
      });

      component?.changeDetectorRef.detectChanges();
    }
  }

  #getChart(): Promise<Type<Chart>> | undefined {
    switch (this.chartType) {
      case ChartType.bar:
        return import('../bar-chart/bar-chart.component').then(
          (m) => m.BarChartComponent
        );
      case ChartType.line:
        return import('../line-chart/line-chart.component').then(
          (m) => m.LineChartComponent
        );
      case ChartType.pie:
        return import('../donut-chart/donut-chart.component').then(
          (m) => m.DonutChartComponent
        );
    }

    return undefined;
  }
}

export const CHART_DATA_SOURCE = new InjectionToken<DataSource>(
  'ChartDataSource'
);
