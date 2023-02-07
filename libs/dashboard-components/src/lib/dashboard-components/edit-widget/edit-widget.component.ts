import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@ngrx/component';
import { ForModule } from '@rx-angular/template/for';
import {
  AvailableDataSources,
  AvailableDataSourcesOptions,
} from '../../models/available-datasources.model';
import { ChartType, ChartTypeOptions } from '../../models/chart-type.model';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetStoreService } from './../../services/widget.store.service';

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
    WidgetComponent,
  ],
  template: ` <dash-widget *ngrxLet="widget$ as widget" [widget]="widget">
    <mat-card-header>
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
  </dash-widget>`,
  styleUrls: ['./edit-widget.component.scss'],
  providers: [WidgetStoreService],
})
export class EditWidgetComponent {
  readonly #widgetStore = inject(WidgetStoreService);

  protected readonly widget$ = this.#widgetStore.currentWidget$;

  @Input() set widgetId(widgetId: string | undefined) {
    this.#widgetStore.setWidgetId(widgetId);
  }

  protected dataSourceOptions = AvailableDataSourcesOptions;
  protected chartTypeOptions = ChartTypeOptions;

  protected deleteWidget() {
    this.#widgetStore.deleteWidget();
  }

  protected titleChanged(title: string) {
    this.#widgetStore.titleChanged(title);
  }

  protected subtitleChanged(subtitle: string) {
    this.#widgetStore.subtitleChanged(subtitle);
  }

  protected dataSourceChanged(dataSource: AvailableDataSources) {
    this.#widgetStore.dataSourceChanged(dataSource);
  }

  protected chartTypeChanged(chartType: ChartType) {
    this.#widgetStore.chartTypeChanged(chartType);
  }
}
