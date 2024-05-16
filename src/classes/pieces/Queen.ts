import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Queen extends Piece {
  constructor(color) {
    super(color, ['♛', '♕'], PieceType.queen);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    const directions = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    directions.forEach((dir) => this.checkDirection(position, dir, boardMatrix));
  }
}

export default Queen;