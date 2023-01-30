import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {GameState} from '@arkanoid-game/core';
import {filter, Observable, Subscription} from 'rxjs';

interface ArkanoidGameState {
  circleSize: number,
  gameState?: GameState,
}

const initialState: ArkanoidGameState = {
  circleSize: 10,
};

@Injectable({
  providedIn: 'root'
})
export class GameStore extends ComponentStore<ArkanoidGameState> {

  circleSize$: Observable<number> = this.getCircleSizeSelector();
  gameState$: Observable<GameState> = this.getGameStateSelector();

  setCircleSize: (value: number) => Subscription = this.getCircleSizeUpdater();
  setGameState: (value: GameState) => Subscription = this.getGameStateUpdater();

  constructor() {
    super(initialState);
  }

  private getCircleSizeSelector() {
    return this.select(({circleSize}) => circleSize);
  }

  private getGameStateSelector() {
    return this.select(({gameState}) => gameState).pipe(
      filter(Boolean),
    );
  }

 private getCircleSizeUpdater() {
    return this.updater<number>((state: ArkanoidGameState, circleSize) => ({
      ...state,
      circleSize,
    }));
  }

  private getGameStateUpdater() {
    return this.updater<GameState>((state: ArkanoidGameState, gameState) => ({
      ...state,
      gameState,
    }));
  }

}
