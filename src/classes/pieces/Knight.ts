import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Knight extends Piece {
  constructor(color) {
    super(color, ['♞', '♘'], PieceType.knight);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    const [x, y] = position;

    const possibleMovements: [number, number][] = [
      [x - 1, y - 2],
      [x + 1, y - 2],
      [x + 2, y - 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
      [x - 1, y + 2],
      [x - 2, y + 1],
      [x - 2, y - 1],
    ];

    possibleMovements.forEach((pm) => {
      const cell = this.getCellFromCoords(pm, boardMatrix);
      if (this.validCell(cell)) cell.setAvailableMovement(true);
    });
  }
}

export default Knight;