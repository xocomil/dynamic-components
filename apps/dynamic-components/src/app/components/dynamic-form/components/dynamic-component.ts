import { Type } from '@angular/core';
import { ComponentTypes } from '../models/component-types';
import CheckboxComponent from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';

export type DynamicComponent = InputComponent | CheckboxComponent;

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
  [
    ComponentTypes.checkbox,
    () =>
      import('./checkbox/checkbox.component').then(
        (component) => component.CheckboxComponent
      ),
  ],
]);
