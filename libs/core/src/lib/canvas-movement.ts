import Flatten from '@flatten-js/core';
import {PathStep} from './path-step';
import {Boundary} from './boundary';
import {Canvas} from './canvas';

export class CanvasMovement {

  active = true;
  private pathStep: PathStep;
  private boundaries: Boundary[] = []

  constructor(private canvas: Canvas) {
    this.pathStep = this.initializePathStep(canvas);
  }

  addBoundary(boundary: Boundary){
    this.boundaries.push(boundary);
  }

  * getPath(): Iterator<{ x: number, y: number, outsideCanvas: boolean }> {
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
      canvas.step,
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
