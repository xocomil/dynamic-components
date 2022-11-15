import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicComponentsJsonComponentHost]',
  standalone: true,
})
export class JsonComponentHostDirective {
  viewContainerRef = inject(ViewContainerRef);
}
