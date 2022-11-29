import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-components-component-three',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>component-three works!</p> `,
  styleUrls: ['./component-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentThreeComponent {
  public readonly componentType = 'COMPONENT_THREE';
}
