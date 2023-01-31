import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Boundary, Canvas, CanvasMovement, Game, GameState} from '@arkanoid-game/core';
import {GameStore} from '../game.store';
import {first, mergeMap, Subscription} from 'rxjs';

@Component({
  selector: 'arkanoid-game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private gameStarted = false;
  private circleSize = 10;
  private game!: Game;
  private subscription = new Subscription();

  constructor(private gameStore: GameStore) {
  }

  @HostListener('window: keyup', ['$event'])
  watchGameToggle(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.toggleGame();
    }
  }

  ngOnInit() {
    this.initializeStore();
    this.initializeGame();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleGame() {
    if (this.gameStarted) {
      this.game.pause();
      this.gameStarted = false;
    } else {
      this.game.play();
      this.gameStarted = true;
    }
  }

  private initializeStore() {
    this.gameStore.setCircleSize(this.circleSize);
  }

  private initializeGame() {
    const subscription = this.gameStore.canvas$.pipe(
      first(),
      mergeMap(canvas => {
        const movementStrategy = this.getMovementStrategy(canvas);
        this.initializeBoundaries(movementStrategy, canvas);
        this.gameStore.setCanvasMovement(movementStrategy);
        this.game = new Game(movementStrategy);
        return this.game.getGameState();
      }),
    ).subscribe((gameState: GameState) => {
      this.gameStore.setGameState(gameState);
    });
    this.subscription.add(subscription);
  }

  private getMovementStrategy({width, height}: { width: number, height: number }) {
    return new CanvasMovement(
      new Canvas(width, height, 0.5),
    );
  }

  private initializeBoundaries(canvasMovement: CanvasMovement, {width, height}: { width: number, height: number }) {
    canvasMovement.addBoundary(new Boundary('x', {
      x1: width - this.circleSize,
      y1: 0,
      x2: width - this.circleSize,
      y2: height - this.circleSize
    }));
    canvasMovement.addBoundary(new Boundary('x', {x1: 0, y1: 0, x2: 0, y2: height - this.circleSize}));
  }
}
