import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicHostStore } from '../dynamic-host/dynamic-host.store';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'dynamic-components-component-one',
  standalone: true,
  imports: [CommonModule, LetModule],
  template: `
    <ng-container *ngrxLet="user$ as user">
      <div class="label">First Name:</div>
      <div>{{ user?.firstName }}</div>
      <div class="label">Last Name:</div>
      <div>{{ user?.lastName }}</div>
      <div class="label">Age:</div>
      <div>{{ user?.age }}</div>
    </ng-container>
  `,
  styleUrls: ['./component-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentOneComponent {
  #dynamicHostStore = inject(DynamicHostStore);
  user$ = this.#dynamicHostStore.user$;
}
