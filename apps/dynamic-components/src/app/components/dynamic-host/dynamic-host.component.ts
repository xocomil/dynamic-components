import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from, Observable, of } from 'rxjs';
import { PushModule } from '@ngrx/component';
import { ComponentOneComponent } from '../component-one/component-one.component';
import { ComponentTwoComponent } from '../component-two/component-two.component';
import { ComponentThreeComponent } from '../component-three/component-three.component';
import { FormsModule } from '@angular/forms';

type DynamicComponents =
  | ComponentOneComponent
  | ComponentTwoComponent
  | ComponentThreeComponent;

@Component({
  selector: 'dynamic-components-dynamic-host',
  standalone: true,
  imports: [CommonModule, FormsModule, PushModule],
  template: `
    <div>
      <input
        name="componentName"
        [(ngModel)]="componentName"
        placeholder="Enter one, two, or three"
      />
      <button type="button" (click)="addComponent()">Add Component One</button>
    </div>
    <div *ngComponentOutlet="(component$ | ngrxPush) ?? null"></div>
  `,
  styleUrls: ['./dynamic-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicHostComponent {
  protected componentName = 'one';
  protected component$: Observable<Type<DynamicComponents> | null> = of(null);

  #addComponentToPage(componentPromise: Promise<Type<DynamicComponents>>) {
    this.component$ = from(componentPromise);
  }

  protected addComponent() {
    if (!this.componentName) {
      alert('You need specify a component to load.');

      return;
    }

    switch (this.componentName.toLocaleLowerCase()) {
      case 'one':
        this.#addComponentToPage(
          import('../component-one/component-one.component').then(
            (component) => component.ComponentOneComponent
          )
        );
        break;
      case 'two':
        this.#addComponentToPage(
          import('../component-two/component-two.component').then(
            (component) => component.ComponentTwoComponent
          )
        );
        break;
      case 'three':
        this.#addComponentToPage(
          import('../component-three/component-three.component').then(
            (component) => component.ComponentThreeComponent
          )
        );
        break;
      default:
        alert(
          `I don't know what ${this.componentName} is. Enter "one", "two" or "three"`
        );
    }
  }
}
