import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { PushModule } from '@ngrx/component';
import {
  VisAxisModule,
  VisCrosshairModule,
  VisGroupedBarModule,
  VisTooltipModule,
  VisXYContainerModule,
} from '@unovis/angular';
import { CHART_DATA_SOURCE } from '../widget/widget.component';

@Component({
  selector: 'dash-bar-chart',
  standalone: true,
  imports: [
    CommonModule,
    VisAxisModule,
    VisCrosshairModule,
    VisGroupedBarModule,
    VisTooltipModule,
    VisXYContainerModule,
    PushModule,
  ],
  template: `
    <vis-xy-container [data]="dataSource.data$ | ngrxPush">
      <vis-tooltip></vis-tooltip>
      <vis-grouped-bar [x]="dataSource.x" [y]="dataSource.y"></vis-grouped-bar>
      <vis-axis
        type="x"
        [gridLine]="true"
        [tickFormat]="dataSource.tickFormat"
        [numTicks]="7"
      ></vis-axis>
      <vis-axis type="y" [gridLine]="true"></vis-axis>
      <vis-crosshair [template]="dataSource.template"></vis-crosshair>
    </vis-xy-container>
  `,
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent {
  protected readonly dataSource = inject(CHART_DATA_SOURCE);

  constructor() {
    console.log('dataSource:', this.dataSource);
  }
}
