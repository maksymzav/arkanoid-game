import Flatten from '@flatten-js/core';
import {PathStep} from './path-step';
import {Canvas} from './game';
import {Boundary} from './boundary';

const defaultStep = 10;

export class CanvasMovement {

  active = true;
  private boundaries: Boundary[];
  private pathStep: PathStep;

  constructor(canvas: Canvas, boundaries: { axis: 'x' | 'y', coordinate: number }[] = []) {
    this.pathStep = this.initializePathStep(canvas);
    this.boundaries = this.initializeBoundaries(boundaries, canvas);
  }

  * getPath(): Iterator<{ x: number, y: number }> {
    yield {x: this.pathStep.x, y: this.pathStep.y};
    while (this.active) {
      const line = this.pathStep.getSegment();
      const intersections = this.findBoundaryIntersections(line);
      this.calculateReflection(intersections);
      this.pathStep.setNextStep();
      yield {x: this.pathStep.x, y: this.pathStep.y};
    }
  }

  private initializeBoundaries(boundaries: { axis: 'x' | 'y'; coordinate: number }[], canvas: Canvas) {
    return boundaries.map(boundary =>
      boundary.axis === 'x'
        ? Boundary.createForAxisX(boundary.coordinate, 0, canvas.width)
        : Boundary.createForAxisY(boundary.coordinate, 0, canvas.height)
    );
  }

  private initializePathStep(canvas: Canvas) {
    return new PathStep(
      Math.floor(canvas.width / 2),
      1,
      defaultStep,
    );
  }

  private findBoundaryIntersections(line: Flatten.Segment) {
    return this.boundaries.filter(boundarySegment =>
      line.intersect(boundarySegment.line).length > 0);
  }

  private calculateReflection(intersection: Boundary[]) {
    intersection.forEach(intersection => {
      if (intersection.axis === 'x') {
        this.pathStep.reflectY();
      } else {
        this.pathStep.reflectX();
      }
    });
  }
}
