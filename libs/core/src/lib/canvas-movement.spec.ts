import {CanvasMovement} from './canvas-movement';
import {Canvas} from './game';

describe('CanvasMovement', () => {
  it('should reflect when meet a boundary', () => {
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        {axis: 'x', coordinate: 50},
        {axis: 'x', coordinate: 0},
        {axis: 'y', coordinate: 100},
        {axis: 'y', coordinate: 0},
      ],
    );
    const iterator = canvasMovement.getPath();

    expect(iterator.next().value).toEqual({x: 50, y: 1});
    expect(iterator.next().value).toEqual({x: 60, y: 11});
    expect(iterator.next().value).toEqual({x: 70, y: 21});
    expect(iterator.next().value).toEqual({x: 80, y: 31});
    expect(iterator.next().value).toEqual({x: 90, y: 41});
    expect(iterator.next().value).toEqual({x: 100, y: 31});
    expect(iterator.next().value).toEqual({x: 90, y: 21});
    expect(iterator.next().value).toEqual({x: 80, y: 11});
    expect(iterator.next().value).toEqual({x: 70, y: 1});
    expect(iterator.next().value).toEqual({x: 60, y: 11});
  });
});


