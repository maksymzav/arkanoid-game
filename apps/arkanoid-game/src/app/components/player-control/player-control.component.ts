import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Key} from 'ts-key-enum';

@Component({
  selector: 'arkanoid-game-player-control',
  template: `
    <div
      class="arkanoid-player-control"
      [style.width]="width + 'px'"
      [style.height]="height + 'px'"
      [style.left]="leftPosition + 'px'"
      [style.top]="topPosition + 'px'"
    ></div>
  `,
  styles: [`
    .arkanoid-player-control {
      background: cornflowerblue;
      position: absolute;
      box-sizing: border-box;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerControlComponent {
  @Input()  width = 50;
  @Input() height = 5;
  @Input() topPosition = 0;
  @Input() leftPosition = 0;
  @Input() moveRightControl: Key | string = Key.ArrowRight;
  @Input() moveLeftControl: Key | string = Key.ArrowLeft;
  @Input() maxX = 50;

  @Output() xPositionChange = new EventEmitter<number>();

  @HostListener('window:keydown', ['$event'])
  handleMove(event: KeyboardEvent) {
    if (event.key === this.moveRightControl){
      this.setPosition(this.leftPosition + this.width / 2);
    } else if (event.key === this.moveLeftControl){
      this.setPosition(this.leftPosition - this.width / 2);
    }
  }

  private setPosition(position: number){
    if (position >=0 && position <= this.maxX - this.width){
      this.leftPosition = position;
      this.xPositionChange.emit(this.leftPosition);
    }
  }
}
