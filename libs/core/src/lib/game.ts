import {ReplaySubject, Subscription, timer} from 'rxjs';
import {CanvasMovement} from './canvas-movement';
import {GameState} from './typings/game-state.interface';

export class Game {

  private gameState$ = new ReplaySubject<GameState>(1);

  private stepX = 1;
  private stepY = 1;
  private timer = new Subscription();
  private getPath: Iterator<{ x: number, y: number }>;

  constructor(private canvasMovement: CanvasMovement) {
    this.getPath = canvasMovement.getPath();
  }

  setStep(newStep: number) {
    this.stepX = newStep;
    this.stepY = newStep;
  }

  getGameState() {
    return this.gameState$.asObservable();
  }

  play() {
    this.timer = timer(0, 1)
      .subscribe(() => {
        const next = this.getPath.next().value;
        const gameFinished = next.outsideCanvas;
        this.gameState$.next({
            ballPosition: {x: next.x, y: next.y},
            gameFinished,
          }
        );
        if (gameFinished) {
          this.endGame();
        }
      });
  }

  pause() {
    this.timer.unsubscribe();
  }

  endGame() {
    this.canvasMovement.active = false;
    this.timer.unsubscribe();
    this.gameState$.complete();
  }


}
