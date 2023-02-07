import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@ngrx/component';
import { ForModule } from '@rx-angular/template/for';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import {
  AvailableDataSources,
  AvailableDataSourcesOptions,
} from '../../models/available-datasources.model';
import { ChartType, ChartTypeOptions } from '../../models/chart-type.model';
import { DashboardWidget } from '../../models/dashboard-widget';
import { DashboardDataSourceService } from '../../services/dashboard-data-source.service';
import { DashboardStoreService } from '../../services/dashboard-store.service';
import { getChart } from '../../services/get-component';

@Component({
  selector: 'dash-edit-widget',
  standalone: true,
  imports: [
    CommonModule,
    ForModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LetModule,
  ],
  template: ` <mat-card>
    <mat-card-header *ngrxLet="widget$ as widget">
      <div class="container">
        <div class="button-area">
          <button mat-icon-button (click)="deleteWidget()">
            <mat-icon fontIcon="delete" />
          </button>
        </div>
        <div class="title-input">
          <label>Title</label>
          <input
            matInput
            [ngModel]="widget?.title"
            (ngModelChange)="titleChanged($event)"
            [ngModelOptions]="{ updateOn: 'blur' }"
          />
        </div>
        <div class="sub-title-input">
          <label>Subtitle</label>
          <input
            matInput
            [ngModel]="widget?.subTitle"
            (ngModelChange)="subtitleChanged($event)"
            [ngModelOptions]="{ updateOn: 'blur' }"
          />
        </div>
        <div class="data-source-input">
          <label>Data Source</label>
          <select
            [ngModel]="widget?.dataSource"
            (ngModelChange)="dataSourceChanged($event)"
          >
            <option
              *rxFor="let dataSource of dataSourceOptions"
              [value]="dataSource.value"
            >
              {{ dataSource.description }}
            </option>
          </select>
        </div>
        <div class="chart-type-input">
          <label>Chart Type</label>
          <select
            [ngModel]="widget?.chartType"
            (ngModelChange)="chartTypeChanged($event)"
          >
            <option
              *rxFor="let chartType of chartTypeOptions"
              [value]="chartType.value"
            >
              {{ chartType.description }}
            </option>
          </select>
        </div>
      </div>
    </mat-card-header>
    <mat-card-content>
      <ng-container #anchor />
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./edit-widget.component.scss'],
})
export class EditWidgetComponent {
  #widgetId?: string;
  @Input() get widgetId(): string | undefined {
    return this.#widgetId;
  }
  set widgetId(widgetId: string | undefined) {
    this.#widgetId = widgetId;

    this.#widgetId$.next(widgetId);
  }

  #widgetId$ = new BehaviorSubject<string | undefined>(undefined);

  protected dataSourceOptions = AvailableDataSourcesOptions;
  protected chartTypeOptions = ChartTypeOptions;

  protected widget$ = this.#widgetId$.pipe(
    filter(Boolean),
    switchMap((widgetId) => {
      return this.#dashboardStoreService.getWidgetFromId(widgetId);
    }),
    tap((widget) => {
      void this.#loadWidgetData(widget);
    })
  );

  @ViewChild('anchor', { static: true, read: ViewContainerRef })
  anchor!: ViewContainerRef;

  readonly #dashboardStoreService = inject(DashboardStoreService);
  readonly #injector = inject(Injector);
  readonly #dashboardDataService = inject(DashboardDataSourceService);

  protected readonly editMode$ = this.#dashboardStoreService.editMode$;

  async #loadWidgetData(widget: DashboardWidget | undefined) {
    if (!widget?.dataSource) return;

    const chart = await getChart(widget.chartType);

    if (chart) {
      this.anchor.clear();

      const component = this.anchor.createComponent(chart, {
        injector: Injector.create({
          providers: [
            this.#dashboardDataService.getProvider(widget.dataSource),
          ],
          parent: this.#injector,
        }),
      });

      component?.changeDetectorRef.detectChanges();
    }
  }

  protected deleteWidget() {
    if (this.#widgetId) {
      this.#dashboardStoreService.deleteWidgetById({ id: this.#widgetId });
    }
  }

  protected titleChanged(title: string) {
    if (!this.#widgetId) {
      console.error('Widget id is not set.');

      return;
    }

    this.#dashboardStoreService.updateTitle({ id: this.#widgetId, title });
  }

  protected subtitleChanged(subtitle: string) {
    if (!this.#widgetId) {
      console.error('Widget id is not set.');

      return;
    }

    this.#dashboardStoreService.updateSubtitle({
      id: this.#widgetId,
      subtitle,
    });
  }

  protected dataSourceChanged(dataSource: AvailableDataSources) {
    if (!this.#widgetId) {
      console.error('Widget id is not set.');

      return;
    }

    this.#dashboardStoreService.updateDataSource({
      id: this.#widgetId,
      dataSource,
    });
  }

  protected chartTypeChanged(chartType: ChartType) {
    if (!this.#widgetId) {
      console.error('Widget id is not set.');

      return;
    }

    this.#dashboardStoreService.updateChartType({
      id: this.#widgetId,
      chartType,
    });
  }
}
