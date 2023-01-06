import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushModule } from '@ngrx/component';
import { DashboardStoreService } from '../../services/dashboard-store.service';

@Component({
  selector: 'dash-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PushModule,
  ],
  template: ` <mat-card>
    <mat-card-actions *ngIf="editMode$ | ngrxPush" [@buttonFade]>
      <button mat-icon-button [@buttonFade]>
        <mat-icon fontIcon="edit"></mat-icon>
      </button>
      <button mat-icon-button [@buttonFade]>
        <mat-icon fontIcon="delete"></mat-icon>
      </button>
    </mat-card-actions>
    <mat-card-content> Widget works!</mat-card-content>
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
export class WidgetComponent {
  readonly #dashboardStoreService = inject(DashboardStoreService);

  protected readonly editMode$ = this.#dashboardStoreService.editMode$;
}
