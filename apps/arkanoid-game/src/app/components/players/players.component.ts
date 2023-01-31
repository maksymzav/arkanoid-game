import {Component, OnDestroy, OnInit} from '@angular/core';
import {Boundary} from '@arkanoid-game/core';
import {GameStore} from '../../../game.store';
import {first, Subscription, zip} from 'rxjs';
import {PlayerConfig} from '../../typings/player-config.interface';

const playerWidth = 50;
const playerHeight = 10;

@Component({
  selector: 'arkanoid-game-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit, OnDestroy {

  playerState$ = this.gameStore.playersState$;
  player1Config!: PlayerConfig;
  player2Config!: PlayerConfig;
  player1: Boundary = new Boundary('y', {x1: 0, x2: 0, y1: 0, y2: 0});
  player2: Boundary = new Boundary('y', {x1: 0, x2: 0, y1: 0, y2: 0});

  private circleSize!: number;
  canvas!: { width: number, height: number };
  private subscription = new Subscription();

  constructor(private gameStore: GameStore) {
  }

  ngOnInit() {
    this.initializePlayers();
    this.trackScore();
  }

  private trackScore() {
    this.gameStore.gameState$.subscribe(({intersection}) => {
      intersection.forEach(boundary => {
        if (boundary === this.player1) {
          this.gameStore.incrementPlayerOneScore();
        } else if (boundary === this.player2) {
          this.gameStore.incrementPlayerTwoScore();
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializePlayers() {
    const subscription = zip(
      this.gameStore.canvas$,
      this.gameStore.circleSize$,
      this.gameStore.canvasMovement$,
    ).pipe(first()).subscribe(([canvas, circleSize, canvasMovement]) => {
      this.circleSize = circleSize;
      this.canvas = canvas;
      this.setPlayerOneConfig();
      this.setPlayerTwoConfig();
      this.configurePlayers();
      canvasMovement.addBoundary(this.player1);
      canvasMovement.addBoundary(this.player2);
    });
    this.subscription.add(subscription);
  }

  private configurePlayers() {
    const subscription = this.playerState$.subscribe(({playerOneOn, playerTwoOn}) => {
      this.configurePlayerOne(playerOneOn);
      this.configurePlayerTwo(playerTwoOn);
    });
    this.subscription.add(subscription);

  }

  private configurePlayerOne(playerOneOn: boolean) {
    if (playerOneOn) {
      this.enablePlayer1();
    } else {
      this.buildBottomWall();
    }
  }

  private configurePlayerTwo(playerTwoOn: boolean) {
    if (playerTwoOn) {
      this.enablePlayer2();
    } else {
      this.buildTopWall();
    }
  }

  private enablePlayer1() {
    this.player1.update({
      x1: this.player1Config.startPositionX,
      y1: this.player1Config.positionY,
      x2: this.player1Config.startPositionX + this.player1Config.width,
      y2: this.player1Config.positionY + this.player1Config.height - this.circleSize,
      trackInteraction: true,
    });
  }

  private enablePlayer2() {
    this.player2.update({
      x1: this.player2Config.startPositionX,
      y1: this.player2Config.positionY,
      x2: this.player2Config.startPositionX + this.player2Config.width,
      y2: this.player2Config.positionY + this.player2Config.height - this.circleSize,
      trackInteraction: true,
    });
  }

  private buildTopWall() {
    this.player2.update({
      x1: 0,
      y1: 0,
      x2: this.canvas.width - this.circleSize,
      y2: 0,
      trackInteraction: false,
    });
  }

  private buildBottomWall() {
    this.player1.update({
      x1: 0,
      y1: this.canvas.height - this.circleSize,
      x2: this.canvas.width - this.circleSize,
      y2: this.canvas.height - this.circleSize,
      trackInteraction: false,
    });
  }

  private setPlayerOneConfig() {
    this.player1Config = {
      width: playerWidth,
      height: playerHeight,
      startPositionX: this.canvas.width - playerWidth / 2,
      positionY: this.canvas.height - playerHeight,
    };
  }

  private setPlayerTwoConfig() {
    this.player2Config = {
      width: playerWidth,
      height: playerHeight,
      startPositionX: this.canvas.width - playerWidth / 2,
      positionY: 0,
    };
  }


}
