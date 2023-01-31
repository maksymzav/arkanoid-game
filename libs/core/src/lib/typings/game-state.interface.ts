import {Boundary} from '../boundary';

export interface GameState {
  gameFinished: boolean;

  ballPosition: {
    x: number;
    y: number;
  };

  intersection: Boundary[];
}
