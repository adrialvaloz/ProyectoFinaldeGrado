import Cell from './Cell';
import { Color, PieceType } from '../types';

class Piece {
  color: Color;
  miau: string[];
  type: PieceType;
  moved: boolean;

  constructor(color, miau, type) {
    this.color = color;
    this.miau = miau;
    this.type = type;
    this.moved = false;
  }

  getCellFromCoords(position: [number, number], boardMatrix: Cell[][]): Cell | null {
    const [x, y] = position;
    const rank = boardMatrix[x] || [];
    const cell = rank[y];
    return cell;
  }

  checkDirection(position, direction, boardMatrix) {
    const [x, y] = position;
    const [xDir, yDir] = direction;
    for (let i = 1; i <= boardMatrix.length; i += 1) {
      const cell = this.getCellFromCoords([x + (i * xDir), y + (i * yDir)], boardMatrix);
      if (!cell) break;
      if (cell.piece && cell.piece.color === this.color) break;
      cell.setAvailableMovement(true);
      if (cell.piece) break;
    }
  }

  validCell(cell: Cell): boolean {
    return cell && !(cell.piece && cell.piece.color === this.color);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    throw new Error(`Missing availableMovements in ${this.type}`);
  }
}

export default Piece;