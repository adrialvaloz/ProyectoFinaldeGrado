import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Rook extends Piece {
  constructor(color) {
    super(color, ['♜', '♖'], PieceType.rook);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    this.checkDirection(position, [0, -1], boardMatrix);
    this.checkDirection(position, [1, 0], boardMatrix);
    this.checkDirection(position, [0, 1], boardMatrix);
    this.checkDirection(position, [-1, 0], boardMatrix);
  }
}

export default Rook;