import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonComponentHostDirective } from '../../directives/json-component-host.directive';
import { InputComponent } from '../input/input.component';
import { formValidator } from './dynamic-form-json.validator';

type InputType = InputComponent;

@Component({
  selector: 'dynamic-components-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonComponentHostDirective],
  template: `
    <div class="json-input">
      <textarea name="componentJson" [(ngModel)]="componentJson"></textarea>
      <button type="button" (click)="loadComponents()">Load!</button>
    </div>
    <hr />
    <form #form="ngForm">
      <div class="dynamic-components" dynamicComponentsJsonComponentHost></div>
    </form>
    <pre>
      {{ form.value | json }}
    </pre
    >
  `,

  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  protected componentJson = `{ "inputs": [
    {
      "form_id": "name",
      "inputType": "string",
      "required": true,
      "minLength": 5,
      "maxLength": 50,
      "placeholder": "Enter your name",
      "label": "First Name:"
    }
  ] }`;

  @ViewChild('form', { static: true }) protected readonly form!: NgForm;

  @ViewChild(JsonComponentHostDirective, { static: true })
  protected readonly hostContainer?: JsonComponentHostDirective;

  protected loadComponents() {
    const jsonData = JSON.parse(this.componentJson);
    const formInputs = formValidator.safeParse(jsonData);

    console.log('zod parsed data', formInputs);
  }
}
