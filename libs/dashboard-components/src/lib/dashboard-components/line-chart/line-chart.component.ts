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
  VisLineModule,
  VisTooltipModule,
  VisXYContainerModule,
} from '@unovis/angular';
import { CHART_DATA_SOURCE } from '../../services/dashboard-data-source.service';

@Component({
  selector: 'dash-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    VisXYContainerModule,
    PushModule,
    VisTooltipModule,
    VisAxisModule,
    VisCrosshairModule,
    VisLineModule,
  ],
  template: `
    <vis-xy-container [data]="dataSource.data$ | ngrxPush">
      <vis-tooltip />
      <vis-axis
        type="x"
        [gridLine]="true"
        [tickFormat]="dataSource.tickFormat"
        [numTicks]="6"
      />
      <vis-axis type="y" [gridLine]="true" />
      <vis-crosshair [template]="dataSource.template" />
      <vis-line [x]="dataSource.x" [y]="dataSource.y" />
    </vis-xy-container>
  `,
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  protected readonly dataSource = inject(CHART_DATA_SOURCE);
}
