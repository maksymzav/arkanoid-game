import Flatten from '@flatten-js/core';
import Segment = Flatten.Segment;
import Point = Flatten.Point;

export class Boundary {

  public reflectionAxis: 'x' | 'y';
  public trackInteraction: boolean;
  public line: Segment;

  constructor(
    reflectionAxis: 'x' | 'y',
    {x1, y1, x2, y2}: { x1: number, y1: number, x2: number, y2: number },
    trackInteraction = false,
  ) {
    this.reflectionAxis = reflectionAxis;
    this.line = new Segment(new Point(x1, y1), new Point(x2, y2));
    this.trackInteraction = trackInteraction;
  }

  update({
           x1,
           y1,
           x2,
           y2,
           trackInteraction
         }: { x1?: number, y1?: number, x2?: number, y2?: number, trackInteraction?: boolean }) {
    const currentX1 = this.line.start.x;
    const currentX2 = this.line.end.x;
    const currentY1 = this.line.start.y;
    const currentY2 = this.line.end.y;

    this.line = new Segment(
      new Point(x1 ?? currentX1, y1 ?? currentY1),
      new Point(x2 ?? currentX2, y2 ?? currentY2)
    );

    if (trackInteraction !== undefined) {
      this.trackInteraction = trackInteraction;
    }
  }
}
