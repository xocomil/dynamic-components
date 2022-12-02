import { Injectable, Type } from '@angular/core';
import {
  DynamicComponent,
  DynamicComponentMap,
} from '../components/dynamic-component';
import { ComponentTypes } from '../models/component-types';

@Injectable()
export class DynamicComponentService {
  getComponentFromType(
    componentType: ComponentTypes
  ): Promise<Type<DynamicComponent>> | undefined {
    return DynamicComponentMap.get(componentType)?.();
  }
}
