import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
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
        [required]="settings?.required ?? false"
    /></label>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class InputComponent implements OnInit {
  readonly componentType = 'input';
  protected form = inject(NgForm);

  protected value = '';

  @Input() settings?: FormSettings;

  ngOnInit(): void {
    this.#updateOptionalValidators();
  }

  #updateOptionalValidators() {
    if (!this.settings) {
      return;
    }

    setTimeout(() => {
      console.log('controls', { ...this.form.control.controls });

      if (this.settings?.minLength) {
        this.form.controls[this.settings.formId]?.addValidators(
          Validators.minLength(this.settings.minLength)
        );

        this.form.control.updateValueAndValidity();
      }
      if (this.settings?.maxLength) {
        console.log('maxLength', this.settings?.maxLength);

        this.form.controls[this.settings.formId].addValidators(
          Validators.maxLength(this.settings.maxLength)
        );

        this.form.control.updateValueAndValidity();
      }
    }, 0);
  }
}

export default InputComponent;
