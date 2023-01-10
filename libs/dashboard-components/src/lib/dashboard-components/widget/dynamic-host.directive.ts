import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dashDynamicHost]',
  standalone: true,
})
export class DynamicHostDirective {
  viewContainerRef = inject(ViewContainerRef);
}
