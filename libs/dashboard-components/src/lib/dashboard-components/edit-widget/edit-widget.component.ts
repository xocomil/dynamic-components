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
import { MatInputModule } from '@angular/material/input';
import { LetModule } from '@ngrx/component';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { DashboardWidget } from '../../models/dashboard-widget';
import { DashboardDataSourceService } from '../../services/dashboard-data-source.service';
import { DashboardStoreService } from '../../services/dashboard-store.service';
import { getChart } from '../../services/get-component';

@Component({
  selector: 'dash-edit-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
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
          <mat-form-field>
            <label>Title</label>
            <input matInput [ngModel]="widget?.title" />
          </mat-form-field>
        </div>
        <div class="sub-title-input">
          <mat-form-field>
            <label>Subtitle</label>
            <input matInput [ngModel]="widget?.subTitle" />
          </mat-form-field>
        </div>
        <div class="data-source-input"></div>
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

  protected widget$ = this.#widgetId$.pipe(
    filter(Boolean),
    switchMap((widgetId) => {
      console.log('widgetId', widgetId);

      return this.#dashboardStoreService.getWidgetFromId(widgetId);
    }),
    tap((widget) => {
      void this.#loadWidgetData(widget);
    })
    // shareReplay(1)
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
}
