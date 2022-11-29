import {
  ChangeDetectionStrategy,
  Component,
  Type,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonComponentHostDirective } from '../../directives/json-component-host.directive';
import { DynamicHostStore } from '../dynamic-host/dynamic-host.store';
import { ComponentOneComponent } from '../component-one/component-one.component';
import { ComponentTwoComponent } from '../component-two/component-two.component';
import { ComponentThreeComponent } from '../component-three/component-three.component';
import { z } from 'zod';

const validator = z.object({
  components: z.array(
    z.union([
      z.literal('two'),
      z.literal('three'),
      z.object({
        componentType: z.literal('one'),
        data: z.object({
          firstName: z.string(),
          lastName: z.string(),
          age: z.number(),
        }),
      }),
    ])
  ),
});

type DynamicComponents =
  | ComponentOneComponent
  | ComponentTwoComponent
  | ComponentThreeComponent;

@Component({
  selector: 'dynamic-components-json-dynamic',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonComponentHostDirective],
  template: `
    <div class="json-input">
      <textarea name="componentJson" [(ngModel)]="componentJson"></textarea>
      <button type="button" (click)="loadComponents()">Load!</button>
    </div>
    <hr />
    <div class="dynamic-components" dynamicComponentsJsonComponentHost></div>
  `,
  styleUrls: ['./json-dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DynamicHostStore],
})
export class JsonDynamicComponent {
  protected componentJson =
    '{ "components": [{"componentType": "one", "data": {"firstName": "from", "lastName": "server", "age": 23}}, "two", "three"] }';

  @ViewChild(JsonComponentHostDirective, { static: true })
  protected hostContainer?: JsonComponentHostDirective;

  protected loadComponents(): void {
    const data = JSON.parse(this.componentJson);
    const parsedData = validator.safeParse(data);

    console.log('data from zod', parsedData);

    if (!parsedData.success) {
      console.log('Invalid JSON.', parsedData.error);

      return;
    }

    if (!this.hostContainer) {
      console.error('No host container found. Please contact support.');

      return;
    }

    this.hostContainer.viewContainerRef.clear();

    parsedData.data.components.forEach(async (componentDescription) => {
      const componentToLoad = await getComponentToLoad(componentDescription);

      if (!componentToLoad) {
        console.error('Component not found:' + componentDescription);

        return;
      }

      const component =
        this.hostContainer?.viewContainerRef.createComponent(componentToLoad);

      if (
        component?.instance.componentType === 'COMPONENT_ONE' &&
        typeof componentDescription !== 'string'
      ) {
        component.setInput('user', componentDescription.data);
      }

      component?.changeDetectorRef.markForCheck();
    });
  }
}

const getComponentToLoad = (
  componentDescription: string | { componentType: string }
): Promise<Type<DynamicComponents>> | undefined => {
  const componentToLoad =
    typeof componentDescription === 'string'
      ? componentDescription
      : componentDescription.componentType;

  switch (componentToLoad) {
    case 'one':
      return import('../component-one/component-one.component').then(
        (component) => component.ComponentOneComponent
      );
    case 'two':
      return import('../component-two/component-two.component').then(
        (component) => component.ComponentTwoComponent
      );
    case 'three':
      return import('../component-three/component-three.component').then(
        (component) => component.ComponentThreeComponent
      );
    default:
      console.warn(
        `I don't know what ${componentDescription} is. Enter "one", "two" or "three"`
      );

      return undefined;
  }
};
