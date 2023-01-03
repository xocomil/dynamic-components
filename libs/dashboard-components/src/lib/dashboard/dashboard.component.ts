import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PushModule } from '@ngrx/component';
import { BarChartComponent } from '../dashboard-components/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../dashboard-components/donut-chart/donut-chart.component';
import { LineChartComponent } from '../dashboard-components/line-chart/line-chart.component';
import { HoursWorkedDataSourceService } from '../data-source/hours-worked-data-source.service';
import { SalesByPersonDataSourceService } from '../data-source/sales-by-person-data-source.service';
import { ValueOverTimeDataSourceService } from '../data-source/value-over-time-data-source.service';
import { DashboardStoreService } from '../services/dashboard-store.service';

@Component({
  selector: 'dash-dashboard',
  standalone: true,
  imports: [
    BarChartComponent,
    CommonModule,
    LineChartComponent,
    MatCardModule,
    DonutChartComponent,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    PushModule,
  ],
  template: `
    <header>Welcome to our Dashboard!</header>
    <div class="dashboard-control">
      <div>
        <mat-form-field>
          <mat-label>Refresh</mat-label>
          <mat-select
            name="refresh"
            [ngModel]="refreshIntervalSeconds$ | ngrxPush"
            (ngModelChange)="refreshIntervalSecondsChanged($event)"
          >
            <mat-option [value]="0">Off</mat-option>
            <mat-option [value]="1">1 Second</mat-option>
            <mat-option [value]="10">10 Seconds</mat-option>
            <mat-option [value]="30">30 Seconds</mat-option>
            <mat-option [value]="60">1 Minute</mat-option>
            <mat-option [value]="300">5 Minutes</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>
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
    DashboardStoreService,
  ],
})
export class DashboardComponent {
  #dashboardStoreService = inject(DashboardStoreService);
  protected refreshIntervalSeconds$ =
    this.#dashboardStoreService.refreshIntervalSeconds$;

  protected hoursWorkedDataSource = inject(HoursWorkedDataSourceService);
  protected salesByPersonDataSource = inject(SalesByPersonDataSourceService);
  protected valueOverTimeDataSource = inject(ValueOverTimeDataSourceService);

  refreshIntervalSecondsChanged(seconds: number): void {
    console.log('seconds', seconds);

    this.#dashboardStoreService.refreshIntervalChange(seconds);
  }
}