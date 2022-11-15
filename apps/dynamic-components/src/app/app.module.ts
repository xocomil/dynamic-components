import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicHostComponent } from './components/dynamic-host/dynamic-host.component';
import { JsonDynamicComponent } from './components/json-dynamic/json-dynamic.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicHostComponent, JsonDynamicComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
