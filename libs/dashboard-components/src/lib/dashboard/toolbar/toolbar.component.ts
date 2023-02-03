import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PushModule } from '@ngrx/component';
import { map } from 'rxjs';
import { DashboardStoreService } from '../../services/dashboard-store.service';

@Component({
  selector: 'dash-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    PushModule,
    MatButtonModule,
  ],
  template: `
    <div class="toolbar">
      <mat-form-field>
        <mat-label>Refresh</mat-label>
        <mat-select
          name="refresh"
          [ngModel]="refreshIntervalSeconds$ | ngrxPush"
          (ngModelChange)="refreshIntervalSecondsChanged($event)"
        >
          <mat-option [value]="0">Off</mat-option>
          <mat-option [value]="1">1 Second</mat-option>
          <mat-option [value]="10">10 Seconds</mat-option>
          <mat-option [value]="30">30 Seconds</mat-option>
          <mat-option [value]="60">1 Minute</mat-option>
          <mat-option [value]="300">5 Minutes</mat-option>
        </mat-select>
      </mat-form-field>
      <div class="buttons">
        <button
          [disabled]="disableSave$ | ngrxPush"
          type="button"
          mat-raised-button
          color="primary"
          (click)="save()"
        >
          <mat-icon fontIcon="save"></mat-icon>
          Save
        </button>
        <button
          type="button"
          mat-raised-button
          color="accent"
          class="edit-button"
          (click)="edit()"
        >
          <mat-icon [fontIcon]="(fontIcon$ | ngrxPush) ?? 'edit'"></mat-icon>
          {{ editButtonText$ | ngrxPush }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  #dashboardStoreService = inject(DashboardStoreService);

  protected refreshIntervalSeconds$ =
    this.#dashboardStoreService.refreshIntervalSeconds$;
  protected fontIcon$ = this.#dashboardStoreService.editMode$.pipe(
    map((editMode) => (editMode ? 'cancel' : 'edit'))
  );
  protected editButtonText$ = this.#dashboardStoreService.editMode$.pipe(
    map((editMode) => (editMode ? 'Cancel' : 'Edit'))
  );
  protected disableSave$ = this.#dashboardStoreService.editMode$.pipe(
    map((editMode) => !editMode)
  );

  protected refreshIntervalSecondsChanged(seconds: number): void {
    this.#dashboardStoreService.refreshIntervalChange(seconds);
  }

  protected edit(): void {
    this.#dashboardStoreService.toggleEditMode();
  }

  protected save(): void {
    this.#dashboardStoreService.save();
  }
}
