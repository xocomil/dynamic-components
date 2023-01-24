import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ForModule } from '@rx-angular/template/for';
import { BarChartComponent } from '../dashboard-components/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../dashboard-components/donut-chart/donut-chart.component';
import { LineChartComponent } from '../dashboard-components/line-chart/line-chart.component';
import { WidgetComponent } from '../dashboard-components/widget/widget.component';
import { HoursWorkedDataSourceService } from '../data-source/hours-worked-data-source.service';
import { SalesByPersonDataSourceService } from '../data-source/sales-by-person-data-source.service';
import { ValueOverTimeDataSourceService } from '../data-source/value-over-time-data-source.service';
import { DashboardDataSourceService } from '../services/dashboard-data-source.service';
import { DashboardStoreService } from '../services/dashboard-store.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'dash-dashboard',
  standalone: true,
  imports: [
    BarChartComponent,
    CommonModule,
    LineChartComponent,
    MatCardModule,
    DonutChartComponent,
    ToolbarComponent,
    WidgetComponent,
    ForModule,
  ],
  template: `
    <header>Welcome to our Dashboard!</header>
    <dash-toolbar />
    <content>
      <dash-widget
        *rxFor="let widget of widgets$"
        [title]="widget.title"
        [subTitle]="widget.subTitle"
        [chartType]="widget.chartType"
        [dataSource]="widget.dataSource"
      />
    </content>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DashboardStoreService,
    DashboardDataSourceService,
    HoursWorkedDataSourceService,
    SalesByPersonDataSourceService,
    ValueOverTimeDataSourceService,
  ],
})
export class DashboardComponent {
  #dashboardStore = inject(DashboardStoreService);

  protected readonly widgets$ = this.#dashboardStore.widgets$;
}
