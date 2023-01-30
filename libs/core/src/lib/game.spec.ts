import {Game} from './game';
import {lastValueFrom, pipe, reduce, take, tap} from 'rxjs';
import {CanvasMovement} from './canvas-movement';
import {Boundary} from './boundary';
import {Canvas} from './canvas';

describe('game', () => {
  it('should never end a game with canvas wide boundaries  ', async () => {
    jest.useFakeTimers();
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        new Boundary('y', {x1: 0, y1: 50, x2: 100, y2: 50}),
        new Boundary('y', {x1: 0, y1: 0, x2: 100, y2: 0}),
        new Boundary('x', {x1: 100, y1: 0, x2: 100, y2: 50}),
        new Boundary('x', {x1: 0, y1: 0, x2: 0, y2: 50}),
      ],
    );
    const game = new Game(canvasMovement);
    game.play();

    const gameState$ = lastValueFrom(game.getGameState().pipe(
      take(1000),
      pipe(
        reduce((acc, current) => current),
        tap(() => game.pause()),
      )
    ));
    jest.runAllTimers();
    const gameState = await gameState$;
    expect(gameState.gameFinished).toBe(false);
  });

  it('should end a game when the canvas height exceeded with no boundary  ', async () => {
    jest.useFakeTimers();
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        new Boundary('y', {x1: 0, y1: 0, x2: 100, y2: 0}),
        new Boundary('x', {x1: 100, y1: 0, x2: 100, y2: 50}),
        new Boundary('x', {x1: 0, y1: 0, x2: 0, y2: 50}),
      ],
    );
    const game = new Game(canvasMovement);
    game.play();

    const gameState$ = lastValueFrom(game.getGameState());
    jest.runAllTimers();
    const gameState = await gameState$;
    expect(gameState.gameFinished).toBe(true);
    expect(gameState.ballPosition).toEqual({x: 100, y: 51});
  });

  it('should end a game when the ball is below x axis with no boundary  ', async () => {
    jest.useFakeTimers();
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        new Boundary('y', {x1: 0, y1: 50, x2: 100, y2: 50}),
        new Boundary('x', {x1: 100, y1: 0, x2: 100, y2: 50}),
        new Boundary('x', {x1: 0, y1: 0, x2: 0, y2: 50}),
      ],
    );
    const game = new Game(canvasMovement);
    game.play();

    const gameState$ = lastValueFrom(game.getGameState());
    jest.runAllTimers();
    const gameState = await gameState$;
    expect(gameState.gameFinished).toBe(true);
    expect(gameState.ballPosition).toEqual({x: 60, y: -9});
  });

  it('should end a game when the canvas width exceeded with no boundary  ', async () => {
    jest.useFakeTimers();
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        new Boundary('y', {x1: 0, y1: 50, x2: 100, y2: 50}),
        new Boundary('y', {x1: 0, y1: 0, x2: 100, y2: 0}),
        new Boundary('x', {x1: 0, y1: 0, x2: 0, y2: 50}),
      ],
    );
    const game = new Game(canvasMovement);
    game.play();

    const gameState$ = lastValueFrom(game.getGameState());
    jest.runAllTimers();
    const gameState = await gameState$;
    expect(gameState.gameFinished).toBe(true);
    expect(gameState.ballPosition).toEqual({x: 110, y: 21});
  });

  it('should end a game when the ball is behind y axis with no boundary  ', async () => {
    jest.useFakeTimers();
    const canvasMovement = new CanvasMovement(
      new Canvas(100, 50),
      [
        new Boundary('y', {x1: 0, y1: 50, x2: 100, y2: 50}),
        new Boundary('y', {x1: 0, y1: 0, x2: 100, y2: 0}),
        new Boundary('x', {x1: 100, y1: 0, x2: 100, y2: 50}),
      ],
    );
    const game = new Game(canvasMovement);
    game.play();

    const gameState$ = lastValueFrom(game.getGameState());
    jest.runAllTimers();
    const gameState = await gameState$;
    expect(gameState.gameFinished).toBe(true);
    expect(gameState.ballPosition).toEqual({x: -10, y: 1});
  });
});
