import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule } from '@ngrx/component';
import { User } from '../../models/user.model';

@Component({
  selector: 'dynamic-components-component-one',
  standalone: true,
  imports: [CommonModule, LetModule],
  template: `
    <div class="label">First Name:</div>
    <div>{{ user?.firstName }}</div>
    <div class="label">Last Name:</div>
    <div>{{ user?.lastName }}</div>
    <div class="label">Age:</div>
    <div>{{ user?.age }}</div>
  `,
  styleUrls: ['./component-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentOneComponent {
  public readonly componentType = 'COMPONENT_ONE';
  @Input() user?: User = undefined;
}
