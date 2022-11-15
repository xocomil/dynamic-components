import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-components-component-two',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>component-two works!</p> `,
  styleUrls: ['./component-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentTwoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
