import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'dash-bar-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content> BarChart goes here! </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent {
  @Input() title = 'Bar Chart';
}
