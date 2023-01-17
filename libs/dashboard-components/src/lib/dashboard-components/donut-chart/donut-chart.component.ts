import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { PushModule } from '@ngrx/component';
import {
  VisCrosshairModule,
  VisDonutModule,
  VisSingleContainerModule,
  VisTooltipModule,
} from '@unovis/angular';
import { Donut } from '@unovis/ts';
import { CHART_DATA_SOURCE } from '../widget/widget.component';

@Component({
  selector: 'dash-donut-chart',
  standalone: true,
  imports: [
    CommonModule,
    VisSingleContainerModule,
    PushModule,
    VisDonutModule,
    VisTooltipModule,
    VisCrosshairModule,
  ],
  template: `
    <vis-single-container [data]="dataSource.data$ | ngrxPush">
      <vis-donut [arcWidth]="0" [value]="dataSource.value" />
      <vis-tooltip [triggers]="triggers" />
    </vis-single-container>
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

  protected readonly dataSource = inject(CHART_DATA_SOURCE);
}
