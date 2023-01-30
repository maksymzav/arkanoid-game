import Flatten from '@flatten-js/core';
import Segment = Flatten.Segment;
import Point = Flatten.Point;

export class PathStep {
  private stepX: number;
  private stepY: number;
  public newX: number;
  public newY: number;

  constructor(
    public x: number,
    public y: number,
    private step: number,
  ) {
    this.stepX = step;
    this.stepY = step;
    this.newX = this.getNewX();
    this.newY = this.getNewY();
  }

  setNextStep() {
    this.x = this.newX;
    this.y = this.newY;
    this.newX = this.getNewX();
    this.newY = this.getNewY();
  }


  getSegment(): Segment {
    return new Segment(new Point(this.x, this.y), new Point(this.newX, this.newY));
  }

  reflectX() {
    this.stepX *= -1;
    this.newX += (this.stepX * 2);
  }

  reflectY() {
    this.stepY *= -1;
    this.newY += (this.stepY * 2);
  }

  private getNewX() {
    return this.x + this.stepX;
  }

  private getNewY() {
    return this.y + this.stepY;
  }

}
