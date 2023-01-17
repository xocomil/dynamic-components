import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushModule } from '@ngrx/component';
import { AvailableDataSources } from '../../models/available-datasources.model';
import { ChartType } from '../../models/chart-type.model';
import { DashboardDataSourceService } from '../../services/dashboard-data-source.service';
import { DashboardStoreService } from '../../services/dashboard-store.service';
import { getChart } from '../../services/get-component';
import { DynamicHostDirective } from './dynamic-host.directive';

@Component({
  selector: 'dash-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PushModule,
    DynamicHostDirective,
  ],
  template: ` <mat-card>
    <mat-card-actions *ngIf="editMode$ | ngrxPush" [@buttonFade]>
      <button mat-icon-button [@buttonFade]>
        <mat-icon fontIcon="edit" />
      </button>
      <button mat-icon-button [@buttonFade]>
        <mat-icon fontIcon="delete" />
      </button>
    </mat-card-actions>
    <mat-card-header>
      <mat-card-title>
        {{ title }}
      </mat-card-title>
      <mat-card-subtitle *ngIf="subTitle">
        {{ subTitle }}
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <ng-container #anchor />
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('buttonFade', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms ease', style({ height: '*' })),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class WidgetComponent implements OnInit {
  @Input() title = 'My Widget';
  @Input() subTitle?: string;
  @Input() dataSource?: AvailableDataSources;
  @Input() chartType: ChartType = ChartType.bar;

  @ViewChild('anchor', { static: true, read: ViewContainerRef })
  anchor!: ViewContainerRef;

  readonly #dashboardStoreService = inject(DashboardStoreService);
  readonly #injector = inject(Injector);
  readonly #dashboardDataService = inject(DashboardDataSourceService);

  protected readonly editMode$ = this.#dashboardStoreService.editMode$;

  async ngOnInit(): Promise<void> {
    if (!this.dataSource) return;

    const chart = await getChart(this.chartType);

    if (chart) {
      this.anchor.clear();

      const component = this.anchor.createComponent(chart, {
        injector: Injector.create({
          providers: [this.#dashboardDataService.getProvider(this.dataSource)],
          parent: this.#injector,
        }),
      });

      component?.changeDetectorRef.detectChanges();
    }
  }
}
