import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CircleComponent} from './components/circle/circle.component';
import {PlayerControlComponent} from './components/player-control/player-control.component';
import {PlayersComponent} from './components/players/players.component';
import {FormsModule} from '@angular/forms';
import {PlayersControlsComponent} from './components/players-controls/players-controls.component';
import {PlayerScoresComponent} from './components/player-scores/player-scores.component';

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    PlayerControlComponent,
    PlayersComponent,
    PlayersControlsComponent,
    PlayerScoresComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
