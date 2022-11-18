import {
  ChangeDetectionStrategy,
  Component,
  Type,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonComponentHostDirective } from './json-component-host.directive';
import { isMatching, P } from 'ts-pattern';
import { DynamicHostStore } from '../dynamic-host/dynamic-host.store';

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
  protected componentJson = '{ "components": ["one", "two", "three"] }';

  @ViewChild(JsonComponentHostDirective, { static: true })
  protected hostContainer?: JsonComponentHostDirective;

  protected loadComponents(): void {
    const items = JSON.parse(this.componentJson);

    if (!checkHasComponents(items)) {
      console.error('Invalid JSON. Should be of form {components: string[]}.');

      return;
    }

    if (!this.hostContainer) {
      console.error('No host container found. Please contact support.');

      return;
    }

    this.hostContainer.viewContainerRef.clear();

    items.components.forEach(async (componentName) => {
      const componentToLoad = await getComponentToLoad(componentName);

      if (!componentToLoad) {
        console.error('Component not found:' + componentName);

        return;
      }

      const component =
        this.hostContainer?.viewContainerRef.createComponent(componentToLoad);

      component?.changeDetectorRef.markForCheck();
    });
  }
}

const getComponentToLoad = (
  componentName: string
): Promise<Type<unknown>> | undefined => {
  switch (componentName) {
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
        `I don't know what ${componentName} is. Enter "one", "two" or "three"`
      );

      return undefined;
  }
};

const checkHasComponents = (
  jsonObject: unknown
): jsonObject is { components: string[] } =>
  isMatching({ components: P.array(P.string) }, jsonObject);
