import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushModule } from '@ngrx/component';
import {
  VisAxisModule,
  VisCrosshairModule,
  VisGroupedBarModule,
  VisTooltipModule,
  VisXYContainerModule,
} from '@unovis/angular';
import {
  BAR_CHART_DATASOURCE_SERVICE,
  HoursWorkedDataSourceService,
} from './hours-worked-data-source.service';

@Component({
  selector: 'dash-bar-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    VisAxisModule,
    VisCrosshairModule,
    VisGroupedBarModule,
    VisTooltipModule,
    VisXYContainerModule,
    PushModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subTitle">{{ subTitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <vis-xy-container [data]="dataSource.data$ | ngrxPush">
          <vis-tooltip></vis-tooltip>
          <vis-grouped-bar
            [x]="dataSource.x"
            [y]="dataSource.y"
          ></vis-grouped-bar>
          <vis-axis
            type="x"
            [gridLine]="true"
            [tickFormat]="dataSource.tickFormat"
            [numTicks]="7"
          ></vis-axis>
          <vis-axis type="y" [gridLine]="true"></vis-axis>
          <vis-crosshair [template]="dataSource.template"></vis-crosshair>
        </vis-xy-container>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BAR_CHART_DATASOURCE_SERVICE,
      useClass: HoursWorkedDataSourceService,
    },
  ],
})
export class BarChartComponent {
  protected readonly dataSource = inject(BAR_CHART_DATASOURCE_SERVICE);

  @Input() title = 'Bar Chart';
  @Input() subTitle?: string;
}
