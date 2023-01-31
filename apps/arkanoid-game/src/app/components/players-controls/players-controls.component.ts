import { Component } from '@angular/core';
import {GameStore} from '../../../game.store';
import {PlayersState} from '../../typings/players-state.interface';

@Component({
  selector: 'arkanoid-game-players-controls',
  templateUrl: './players-controls.component.html',
  styleUrls: ['./players-controls.component.scss'],
})
export class PlayersControlsComponent {

  playersState$ = this.store.playersState$;
  constructor(private store: GameStore){
  }

  updatePlayersState(value: Partial<PlayersState>){
    this.store.patchPlayersState(value);
  }
}
