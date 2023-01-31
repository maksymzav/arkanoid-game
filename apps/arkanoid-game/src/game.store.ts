import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {CanvasMovement, GameState} from '@arkanoid-game/core';
import {filter, Observable, Subscription} from 'rxjs';
import {PlayersState} from './app/typings/players-state.interface';

interface ArkanoidGameState {
  circleSize: number,
  gameState?: GameState,
  canvas: { width: number, height: number },
  canvasMovement?: CanvasMovement,
  playersState: PlayersState,
  playersScore: { playerOne: number, playerTwo: number },
}

const initialState: ArkanoidGameState = {
  circleSize: 10,
  canvas: {width: 500, height: 400},
  playersState: {playerOneOn: true, playerTwoOn: true},
  playersScore: {playerOne: 0, playerTwo: 0},
};

@Injectable({
  providedIn: 'root'
})
export class GameStore extends ComponentStore<ArkanoidGameState> {

  circleSize$: Observable<number> = this.getCircleSizeSelector();
  gameState$: Observable<GameState> = this.getGameStateSelector();
  canvas$: Observable<{ width: number, height: number }> = this.getCanvasSelector();
  canvasMovement$: Observable<CanvasMovement> = this.getCanvasMovementSelector();
  playersState$: Observable<PlayersState> = this.getPlayersStateSelector();
  playersScore$: Observable<{ playerOne: number, playerTwo: number }> = this.getPlayersScoreSelector();

  setCircleSize: (value: number) => Subscription = this.getCircleSizeUpdater();
  setGameState: (value: GameState) => Subscription = this.getGameStateUpdater();
  setCanvasMovement: (value: CanvasMovement) => Subscription = this.getCanvasMovementUpdater();
  patchPlayersState: (value: Partial<PlayersState>) => Subscription = this.getPlayersStateUpdater();
  incrementPlayerOneScore: () => void = this.getPlayerOneScoreUpdater();
  incrementPlayerTwoScore: () => void = this.getPlayerTwoScoreUpdater();

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

  private getCanvasSelector() {
    return this.select(({canvas}) => canvas);
  }

  private getCanvasMovementSelector() {
    return this.select(({canvasMovement}) => canvasMovement)
      .pipe(filter(Boolean)
      );
  }

  private getPlayersStateSelector() {
    return this.select(({playersState}) => playersState);
  }

  private getPlayersScoreSelector() {
    return this.select(({playersScore}) => playersScore);
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

  private getCanvasMovementUpdater() {
    return this.updater<CanvasMovement>((state: ArkanoidGameState, canvasMovement) => ({
      ...state,
      canvasMovement,
    }));
  }

  private getPlayersStateUpdater() {
    return this.updater<Partial<PlayersState>>((state: ArkanoidGameState, playersState) => {
      return {
        ...state,
        playersState: {
          ...state.playersState,
          ...playersState
        },
      };
    });
  }

  private getPlayerOneScoreUpdater() {
    return this.updater((state: ArkanoidGameState) => ({
      ...state,
      playersScore: {
        playerOne: state.playersScore.playerOne + 1,
        playerTwo: state.playersScore.playerTwo,
      },
    }));
  }

  private getPlayerTwoScoreUpdater() {
    return this.updater((state: ArkanoidGameState) => ({
      ...state,
      playersScore: {
        playerOne: state.playersScore.playerOne,
        playerTwo: state.playersScore.playerTwo + 1,
      },
    }));
  }

}
