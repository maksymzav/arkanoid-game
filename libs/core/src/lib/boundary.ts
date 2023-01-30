import Flatten from '@flatten-js/core';
import Segment = Flatten.Segment;
import Point = Flatten.Point;

export class Boundary {

  constructor(
    public axis: 'x' | 'y',
    public line: Segment,
  ) {

  }

  static createForAxisY(x: number, startY: number, endY: number) {
    return new Boundary(
      'y',
      new Segment(new Point(x, startY), new Point(x, endY))
    );
  }

  static createForAxisX(y: number, startX: number, endX: number) {
    return new Boundary(
      'x',
      new Segment(new Point(startX, y), new Point(endX, y)),
    );
  }
}
