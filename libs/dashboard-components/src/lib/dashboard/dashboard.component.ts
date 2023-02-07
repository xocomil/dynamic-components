import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PushModule } from '@ngrx/component';
import { ForModule } from '@rx-angular/template/for';
import { BarChartComponent } from '../dashboard-components/bar-chart/bar-chart.component';
import { DisplayWidgetComponent } from '../dashboard-components/display-widget/display-widget.component';
import { DonutChartComponent } from '../dashboard-components/donut-chart/donut-chart.component';
import { LineChartComponent } from '../dashboard-components/line-chart/line-chart.component';
import { HoursWorkedDataSourceService } from '../data-source/hours-worked-data-source.service';
import { SalesByPersonDataSourceService } from '../data-source/sales-by-person-data-source.service';
import { ValueOverTimeDataSourceService } from '../data-source/value-over-time-data-source.service';
import { DashboardDataSourceService } from '../services/dashboard-data-source.service';
import { DashboardStoreService } from '../services/dashboard-store.service';
import { EditWidgetComponent } from './../dashboard-components/edit-widget/edit-widget.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'dash-dashboard',
  standalone: true,
  imports: [
    BarChartComponent,
    CommonModule,
    DonutChartComponent,
    EditWidgetComponent,
    ForModule,
    LineChartComponent,
    MatCardModule,
    PushModule,
    ToolbarComponent,
    DisplayWidgetComponent,
  ],
  template: `
    <header>Welcome to our Dashboard!</header>
    <dash-toolbar />
    <content>
      <ng-container *ngIf="!(editMode$ | ngrxPush); else editMode">
        <dash-display-widget
          *rxFor="let widget of widgets$"
          [widgetId]="widget.id"
        />
      </ng-container>
    </content>

    <ng-template #editMode>
      <dash-edit-widget
        *rxFor="let widget of widgets$"
        [widgetId]="widget.id"
      />
    </ng-template>
  `,
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DashboardStoreService,
    DashboardDataSourceService,
    HoursWorkedDataSourceService,
    SalesByPersonDataSourceService,
    ValueOverTimeDataSourceService,
  ],
})
export class DashboardComponent {
  #dashboardStore = inject(DashboardStoreService);

  protected readonly widgets$ = this.#dashboardStore.widgets$;
  protected readonly editMode$ = this.#dashboardStore.editMode$;
}
