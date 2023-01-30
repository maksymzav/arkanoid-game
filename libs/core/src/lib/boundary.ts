import Flatten from '@flatten-js/core';
import Segment = Flatten.Segment;
import Point = Flatten.Point;

export class Boundary {

  public reflectionAxis: 'x' | 'y';
  public line: Segment;

  constructor(
    reflectionAxis: 'x' | 'y',
    {x1, y1, x2, y2}: { x1: number, y1: number, x2: number, y2: number }
  ) {
    this.reflectionAxis = reflectionAxis;
    this.line = new Segment(new Point(x1, y1), new Point(x2, y2));
  }
}
