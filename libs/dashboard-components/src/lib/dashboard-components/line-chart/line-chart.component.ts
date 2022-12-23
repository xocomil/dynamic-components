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
  VisAxisModule,
  VisCrosshairModule,
  VisLineModule,
  VisTooltipModule,
  VisXYContainerModule,
} from '@unovis/angular';
import { DataSource } from '../../models/datasource';

@Component({
  selector: 'dash-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    VisXYContainerModule,
    PushModule,
    VisTooltipModule,
    VisAxisModule,
    VisCrosshairModule,
    VisLineModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subTitle">{{ subTitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <vis-xy-container [data]="dataSource?.data$ | ngrxPush">
          <vis-tooltip></vis-tooltip>
          <vis-axis
            type="x"
            [gridLine]="true"
            [tickFormat]="dataSource?.tickFormat"
            [numTicks]="6"
          ></vis-axis>
          <vis-axis type="y" [gridLine]="true"></vis-axis>
          <vis-crosshair [template]="dataSource?.template"></vis-crosshair>
          <vis-line [x]="dataSource?.x" [y]="dataSource?.y"></vis-line>
        </vis-xy-container>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  @Input() title = 'Line Chart';
  @Input() subTitle?: string;
  @Input() dataSource?: DataSource;
}
