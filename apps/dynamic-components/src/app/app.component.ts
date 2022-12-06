import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'dynamic-components-root',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dynamic-components';
}
