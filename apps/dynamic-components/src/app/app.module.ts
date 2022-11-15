import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicHostComponent } from './components/dynamic-host/dynamic-host.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicHostComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
