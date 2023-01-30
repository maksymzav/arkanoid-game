import Flatten from '@flatten-js/core';
import {PathStep} from './path-step';
import {Boundary} from './boundary';
import {Canvas} from './canvas';

const defaultStep = 10;

export class CanvasMovement {

  active = true;
  private pathStep: PathStep;

  constructor(private canvas: Canvas, private boundaries: Boundary[] = []) {
    this.pathStep = this.initializePathStep(canvas);
  }

  * getPath(): Iterator<{ x: number, y: number }> {
    yield this.getMovementState();
    while (this.active) {
      const line = this.pathStep.getSegment();
      const intersections = this.findBoundaryIntersections(line);
      this.calculateReflection(intersections);
      this.pathStep.setNextStep();
      yield this.getMovementState();
    }
  }

  private getMovementState(){
    return {
      x: this.pathStep.x,
      y: this.pathStep.y,
      outsideCanvas: this.pathStep.x > this.canvas.width || this.pathStep.x < 0 || this.pathStep.y > this.canvas.height || this.pathStep.y < 0
    }
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
      if (intersection.reflectionAxis === 'x') {
        this.pathStep.reflectX();
      } else {
        this.pathStep.reflectY();
      }
    });
  }
}
