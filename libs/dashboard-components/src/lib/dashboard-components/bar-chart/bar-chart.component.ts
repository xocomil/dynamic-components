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
import { CHART_DATA_SOURCE } from '../../services/dashboard-data-source.service';

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
      <vis-tooltip />
      <vis-grouped-bar [x]="dataSource.x" [y]="dataSource.y" />
      <vis-axis
        type="x"
        [gridLine]="true"
        [tickFormat]="dataSource.tickFormat"
        [numTicks]="7"
      />
      <vis-axis type="y" [gridLine]="true" />
      <vis-crosshair [template]="dataSource.template" />
    </vis-xy-container>
  `,
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent {
  protected readonly dataSource = inject(CHART_DATA_SOURCE);
}
