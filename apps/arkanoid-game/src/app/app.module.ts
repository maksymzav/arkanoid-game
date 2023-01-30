import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CircleComponent } from './circle/circle.component';
import { PlayerControlComponent } from './player-control/player-control.component';

@NgModule({
  declarations: [AppComponent, CircleComponent, PlayerControlComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
