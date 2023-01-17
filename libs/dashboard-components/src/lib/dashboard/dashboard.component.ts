import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BarChartComponent } from '../dashboard-components/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../dashboard-components/donut-chart/donut-chart.component';
import { LineChartComponent } from '../dashboard-components/line-chart/line-chart.component';
import { WidgetComponent } from '../dashboard-components/widget/widget.component';
import { HoursWorkedDataSourceService } from '../data-source/hours-worked-data-source.service';
import { SalesByPersonDataSourceService } from '../data-source/sales-by-person-data-source.service';
import { ValueOverTimeDataSourceService } from '../data-source/value-over-time-data-source.service';
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
  ],
  template: `
    <header>Welcome to our Dashboard!</header>
    <dash-toolbar />
    <content>
      <dash-widget
        title="Hours Worked"
        subTitle="How busy were your?"
        chartType="bar"
        dataSource="hoursWorked"
      />
      <dash-widget
        title="Sales By Person"
        subTitle="How sold the most?"
        chartType="bar"
        dataSource="salesByPerson"
      />
      <dash-widget
        title="Value Over Time"
        subTitle="Watch things change"
        chartType="line"
        dataSource="valueOverTime"
      />
      <dash-donut-chart
        title="Hours Worked"
        subTitle="Mmmmmmmgghgmm donuts..."
        [dataSource]="hoursWorkedDataSource"
      />
    </content>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DashboardStoreService,
    HoursWorkedDataSourceService,
    SalesByPersonDataSourceService,
    ValueOverTimeDataSourceService,
  ],
})
export class DashboardComponent {
  protected hoursWorkedDataSource = inject(HoursWorkedDataSourceService);
  protected salesByPersonDataSource = inject(SalesByPersonDataSourceService);
  protected valueOverTimeDataSource = inject(ValueOverTimeDataSourceService);
}
