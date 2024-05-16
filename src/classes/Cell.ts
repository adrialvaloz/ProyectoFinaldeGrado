import Piece from './Piece';

class Cell {
  piece: Piece;
  selected: boolean;
  availableMove: boolean;

  constructor(piece: Piece) {
    this.piece = piece;
    this.selected = false;
    this.availableMove = false;
  }

  setSelected(selected: boolean) {
    this.selected = selected;
  }

  setPiece(piece: Piece) {
    this.piece = piece;
  }

  setAvailableMovement(available: boolean) {
    this.availableMove = available;
  }
}

export default Cell;