import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonComponentHostDirective } from '../../directives/json-component-host.directive';
import { formValidator } from './dynamic-form-json.validator';
import { DynamicComponentService } from './services/dynamic-component.service';

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
  providers: [DynamicComponentService],
})
export class DynamicFormComponent {
  readonly #dynamicComponentService = inject(DynamicComponentService);

  protected componentJson = `{ "inputs": [
    {
      "form_id": "favDino",
      "inputType": "string",
      "required": true,
      "minLength": 5,
      "maxLength": 50,
      "placeholder": "Enter one with feathers",
      "label": "Favorite Dinosaur:"
    }
  ] }`;

  @ViewChild('form', { static: true }) protected readonly form!: NgForm;

  @ViewChild(JsonComponentHostDirective, { static: true })
  protected readonly hostContainer?: JsonComponentHostDirective;

  protected async loadComponents() {
    const parsedInputs = this.#parseJsonFromInput();

    if (!parsedInputs.success) {
      console.error('Could not parse form inputs', parsedInputs.error);

      return;
    }

    for (const input of parsedInputs.data.inputs) {
      const inputPromise = this.#dynamicComponentService.getComponentFromType(
        input.inputType
      );

      if (inputPromise == null) {
        console.warn(`Could not find input for ${input.inputType}:`, input);

        continue;
      }

      if (!this.hostContainer) {
        throw new Error(
          'You need to provide a host container to use a dynamic form'
        );
      }

      const component = await inputPromise;

      const addedComponent =
        this.hostContainer.viewContainerRef.createComponent(component);

      addedComponent.setInput('label', input.label);
      addedComponent.setInput('placeholder', input.placeholder);

      addedComponent.changeDetectorRef.markForCheck();
    }
  }

  #parseJsonFromInput(): typeof formInputs {
    const jsonData = JSON.parse(this.componentJson);
    const formInputs = formValidator.safeParse(jsonData);

    console.log('zod parsed data', formInputs);

    return formInputs;
  }
}
