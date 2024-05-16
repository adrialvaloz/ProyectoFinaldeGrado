import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Bishop extends Piece {
  constructor(color) {
    super(color, ['♝', '♗'], PieceType.bishop);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    // Down Right
    this.checkDirection(position, [1, 1], boardMatrix);

    // Down Left
    this.checkDirection(position, [-1, 1], boardMatrix);

    // Up Right
    this.checkDirection(position, [1, -1], boardMatrix);

    // Up Left
    this.checkDirection(position, [-1, -1], boardMatrix);
  }
}

export default Bishop;