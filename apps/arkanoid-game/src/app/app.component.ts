import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Boundary, Canvas, CanvasMovement, Game, GameState} from '@arkanoid-game/core';

@Component({
  selector: 'arkanoid-game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostListener('window: keyup', ['$event'])
  watchGameToggle(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.toggleGame();
    }
  }

  @ViewChild('container', {static: true}) container!: ElementRef<HTMLDivElement>;
  canvas = {width: 500, height: 400};
  gameStarted = false;
  private game!: Game;
  circlePosition: { x: number, y: number } = {x: 0, y: 0};
  circleSize = 10;

  player1Config = {
    width: 50,
    height: 10,
    startPositionX: this.canvas.width - 25,
    positionY: this.canvas.height - 10,
  };
  player1 = new Boundary('y', {
    x1: this.player1Config.startPositionX,
    y1: this.player1Config.positionY,
    x2: this.player1Config.startPositionX + this.player1Config.width,
    y2: this.player1Config.positionY + this.player1Config.height - this.circleSize
  });

  ngOnInit() {
    this.initializeGame();
  }

  private initializeGame() {
    const movementStrategy = new CanvasMovement(
      new Canvas(this.canvas.width, this.canvas.height, 0.5),
      [
        this.player1,
        new Boundary('y', {
          x1: 0,
          y1: 0,
          x2: this.canvas.width - this.circleSize,
          y2: 0
        }),
        new Boundary('x', {
          x1: this.canvas.width - this.circleSize,
          y1: 0,
          x2: this.canvas.width - this.circleSize,
          y2: this.canvas.height - this.circleSize
        }),
        new Boundary('x', {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: this.canvas.height - this.circleSize
        }),
      ],
    );
    this.game = new Game(movementStrategy);

    this.game.getGameState().subscribe(({ballPosition: {x, y}}: GameState) => {
      this.circlePosition = {x, y};
    });
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
}
