import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameStore} from '../../../game.store';
import {combineLatest, map} from 'rxjs';

@Component({
  selector: 'arkanoid-game-circle',
  template: `
    <div
      class="arkanoid-circle"
      *ngIf="state$ | async as state"
      [style.width]="state.circleSize + 'px'"
      [style.height]="state.circleSize + 'px'"
      [style.left]="state.x + 'px'"
      [style.top]="state.y + 'px'"
    ></div>
  `,
  styles: [`
    .arkanoid-circle {
      border-radius: 10px;
      background: green;
      border: 1px solid darkgreen;
      position: absolute;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleComponent {

  protected state$ = combineLatest(
    [
      this.gameStore.circleSize$,
      this.gameStore.gameState$.pipe(map(({ballPosition: {x, y}}) => ({x, y}))),
    ]
  ).pipe(
    map(([circleSize, {x, y}]) => ({circleSize, x, y})),
  );


  constructor(private gameStore: GameStore) {

  }
}
