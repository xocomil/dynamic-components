import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-components-component-three',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>component-three works!</p> `,
  styleUrls: ['./component-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentThreeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
