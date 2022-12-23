import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushModule } from '@ngrx/component';
import {
  VisCrosshairModule,
  VisDonutModule,
  VisSingleContainerModule,
  VisTooltipModule,
} from '@unovis/angular';
import { Donut } from '@unovis/ts';
import { DataSource } from '../../models/datasource';

@Component({
  selector: 'dash-donut-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    VisSingleContainerModule,
    PushModule,
    VisDonutModule,
    VisTooltipModule,
    VisCrosshairModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subTitle">{{ subTitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <vis-single-container [data]="dataSource?.data$ | ngrxPush">
          <vis-donut [arcWidth]="0" [value]="dataSource?.value"></vis-donut>
          <vis-tooltip [triggers]="triggers"></vis-tooltip>
        </vis-single-container>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./donut-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartComponent<T = any> {
  protected readonly triggers = {
    [Donut.selectors.segment]: (selector: { data: T }) => {
      return this.dataSource?.donutLabel?.(selector);
    },
  };

  @Input() title = 'Donut Chart';
  @Input() subTitle?: string;
  @Input() dataSource?: DataSource<T>;
}
