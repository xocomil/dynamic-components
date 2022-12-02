import { InputComponent } from './input/input.component';
import { ComponentTypes } from '../models/component-types';
import { Type } from '@angular/core';

export type DynamicComponent = InputComponent;

export const DynamicComponentMap = new Map<
  ComponentTypes,
  () => Promise<Type<DynamicComponent>>
>([
  [
    ComponentTypes.string,
    () =>
      import('./input/input.component').then(
        (component) => component.InputComponent
      ),
  ],
]);
