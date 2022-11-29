import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'dynamic-components-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <label>{{ label }}: <input [(ngModel)]="value" /></label> `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class InputComponent {
  readonly componentType = 'input';
  protected form = inject(NgForm);

  @Input() label = 'Input Label';
  @Input() value = '';
  @Input() placeholder = 'Enter some text';
}
