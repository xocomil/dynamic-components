import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BarChartComponent } from '@dash/dashboard';

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
      ></dash-bar-chart>
      <mat-card>Card 2</mat-card>
      <mat-card>Card 3</mat-card>
      <mat-card>Card 4</mat-card>
    </content>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
