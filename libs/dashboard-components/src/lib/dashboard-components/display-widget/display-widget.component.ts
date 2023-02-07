import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LetModule, PushModule } from '@ngrx/component';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetStoreService } from './../../services/widget.store.service';

@Component({
  selector: 'dash-display-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LetModule,
    PushModule,
    WidgetComponent,
  ],
  template: ` <dash-widget *ngrxLet="widget$ as widget" [widget]="widget">
    <mat-card-header>
      <mat-card-title>
        {{ widget?.title }}
      </mat-card-title>
      <mat-card-subtitle *ngIf="widget?.subTitle">
        {{ widget?.subTitle }}
      </mat-card-subtitle>
    </mat-card-header>
  </dash-widget>`,
  styleUrls: ['./display-widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WidgetStoreService],
})
export class DisplayWidgetComponent {
  #widgetId?: string;
  @Input() get widgetId(): string | undefined {
    return this.#widgetId;
  }
  set widgetId(widgetId: string | undefined) {
    this.#widgetId = widgetId;

    this.#widgetStore.setWidgetId(widgetId);
  }

  #widgetStore = inject(WidgetStoreService);

  protected widget$ = this.#widgetStore.currentWidget$;
}
