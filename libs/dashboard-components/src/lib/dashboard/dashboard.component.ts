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
import { HoursWorkedDataSourceService } from '../data-source/hours-worked-data-source.service';
import { SalesByPersonDataSourceService } from '../data-source/sales-by-person-data-source.service';
import { ValueOverTimeDataSourceService } from '../data-source/value-over-time-data-source.service';

@Component({
  selector: 'dash-dashboard',
  standalone: true,
  imports: [
    BarChartComponent,
    CommonModule,
    LineChartComponent,
    MatCardModule,
    DonutChartComponent,
  ],
  template: `
    <header>Welcome to our Dashboard!</header>
    <content>
      <dash-bar-chart
        title="Hours Worked"
        subTitle="How busy were you?"
        [dataSource]="hoursWorkedDataSource"
      ></dash-bar-chart>
      <dash-bar-chart
        title="Sales By Person"
        subTitle="Who sold the most?"
        [dataSource]="salesByPersonDataSource"
      ></dash-bar-chart>
      <dash-line-chart
        title="Value Over Time"
        subTitle="Watch things change"
        [dataSource]="valueOverTimeDataSource"
      ></dash-line-chart>
      <dash-donut-chart
        title="Hours Worked"
        subTitle="Mmmmmmmgghgmm donuts..."
        [dataSource]="hoursWorkedDataSource"
      ></dash-donut-chart>
    </content>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
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
