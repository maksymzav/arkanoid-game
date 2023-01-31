import {Component} from '@angular/core';
import {GameStore} from '../../../game.store';

@Component({
  selector: 'arkanoid-game-player-scores',
  templateUrl: './player-scores.component.html',
  styleUrls: ['./player-scores.component.scss'],
})
export class PlayerScoresComponent {

  playersScore$ = this.gameStore.playersScore$;

  constructor(private gameStore: GameStore) {
  }
}
