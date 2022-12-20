import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  BarChartComponent,
  HoursWorkedDataSourceService,
  SalesByPersonDataSourceService,
} from '@dash/dashboard';

@Component({
  selector: 'dynamic-components-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, BarChartComponent],
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
      <mat-card>Card 3</mat-card>
      <mat-card>Card 4</mat-card>
    </content>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  protected hoursWorkedDataSource = new HoursWorkedDataSourceService();
  protected salesByPersonDataSource = new SalesByPersonDataSourceService();
}
