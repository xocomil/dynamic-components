import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-components-dynamic-host',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>dynamic-host works!</p> `,
  styleUrls: ['./dynamic-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicHostComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
