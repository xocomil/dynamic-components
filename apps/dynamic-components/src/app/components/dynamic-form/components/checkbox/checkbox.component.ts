import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { CheckboxSettings } from '../../dynamic-form-json.validator';

@Component({
  selector: 'dynamic-components-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label
      ><input
        type="checkbox"
        [(ngModel)]="value"
        [name]="settings?.formId ?? 'unknown'"
      />
      {{ settings?.label }}</label
    >
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class CheckboxComponent {
  readonly componentType = 'checkbox';
  protected value = false;

  @Input() settings?: CheckboxSettings;
}

export default CheckboxComponent;
