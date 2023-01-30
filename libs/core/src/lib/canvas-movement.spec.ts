import {CanvasMovement} from './canvas-movement';
import {Boundary} from './boundary';
import {Canvas} from './canvas';

describe('CanvasMovement', () => {
  it('should reflect when meet a boundary', () => {
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        new Boundary('y', {x1: 0, y1: 50, x2: 100, y2: 50}),
        new Boundary('y', {x1: 0, y1: 0, x2: 100, y2: 0}),
        new Boundary('x', {x1: 100, y1: 0, x2: 100, y2: 50}),
        new Boundary('x', {x1: 0, y1: 0, x2: 0, y2: 50}),
      ],
    );
    const iterator = canvasMovement.getPath();

    expect(iterator.next().value).toEqual({x: 50, y: 1, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 60, y: 11, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 70, y: 21, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 80, y: 31, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 90, y: 41, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 100, y: 31, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 90, y: 21, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 80, y: 11, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 70, y: 1, outsideCanvas: false});
    expect(iterator.next().value).toEqual({x: 60, y: 11, outsideCanvas: false});
  });
});


