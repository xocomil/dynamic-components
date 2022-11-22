import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicHostComponent } from './components/dynamic-host/dynamic-host.component';
import { JsonDynamicComponent } from './components/json-dynamic/json-dynamic.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DynamicHostComponent,
    JsonDynamicComponent,
    DynamicFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
