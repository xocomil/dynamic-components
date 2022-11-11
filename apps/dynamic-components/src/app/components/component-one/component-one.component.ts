import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-components-component-one',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>component-one works!</p> `,
  styleUrls: ['./component-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentOneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
