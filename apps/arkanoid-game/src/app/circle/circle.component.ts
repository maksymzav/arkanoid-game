import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'arkanoid-game-circle',
  template: `
    <div
      class="arkanoid-circle"
      [style.width]="size + 'px'"
      [style.height]="size + 'px'"
      [style.left]="positionX + 'px'"
      [style.top]="positionY + 'px'"
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
  @Input() positionX = 0;
  @Input() positionY = 0;
  @Input() size = 10;
}
