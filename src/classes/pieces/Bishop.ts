import Piece from '../Piece';
import Cell from '../Cell';
import { PieceType } from '../../types';

class Bishop extends Piece {
  constructor(color) {
    super(color, ['♝', '♗'], PieceType.bishop);
  }

  availableMovements(position: [number, number], boardMatrix: Cell[][]) {
    //Abajo derecha
    this.checkDirection(position, [1, 1], boardMatrix);

    //Abajo izquierda 
    this.checkDirection(position, [-1, 1], boardMatrix);

    //Arriba derecha
    this.checkDirection(position, [1, -1], boardMatrix);

    //Arriba izquierda
    this.checkDirection(position, [-1, -1], boardMatrix);
  }
}

export default Bishop;