import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { FormSettings } from '../../dynamic-form-json.validator';

@Component({
  selector: 'dynamic-components-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label
      >{{ settings?.label }}:
      <input
        [(ngModel)]="value"
        [name]="settings?.formId ?? 'unknown'"
        [placeholder]="settings?.placeholder"
    /></label>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class InputComponent {
  readonly componentType = 'input';
  protected form = inject(NgForm);

  protected value = '';
  @Input() settings?: FormSettings;
}

export default InputComponent;
