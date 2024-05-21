import Cell from './Cell';
import { Theme } from '../types';

class Board {
  width: number;
  height: number;
  files: number;
  ranks: number;
  theme: Theme;
  pieceTheme: Theme;

  cellWidth: number;
  cellHeight: number;
  pieceOffset: number;
  boardMatrix: Cell[][];

  flip: boolean;

  previousCell: Cell;
  selectedCells: Cell[];

  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(width, height, files, ranks, theme, pieceTheme) {
    this.width = width;
    this.height = height;
    this.files = files;
    this.ranks = ranks;
    this.theme = theme;
    this.pieceTheme = pieceTheme;

    this.flip = false;

    this.cellWidth = this.width / this.files;
    this.cellHeight = this.height / this.ranks;

    this.pieceOffset = this.cellHeight * 0.1;

    this.previousCell = null;
    this.selectedCells = [];

    this.$canvas = document.createElement('canvas');
    this.ctx = this.$canvas.getContext('2d');

    this.$canvas.width = this.width;
    this.$canvas.height = this.height;

    document.body.appendChild(this.$canvas);

    document.body.style.display = 'grid';
    document.body.style.placeItems = 'center';
    document.body.style.height = '100%';
    document.body.parentElement.style.height = '100%';
    document.body.style.backgroundColor = '#333333';

    //Inicializar tablero
    this.boardMatrix = [];
    for (let x = 0; x < this.files; x += 1) {
      this.boardMatrix[x] = [];
      for (let y = 0; y < this.ranks; y += 1) {
        this.boardMatrix[x][y] = new Cell(null);
      }
    }

    //Metodos bind
    this.setSelectedCell = this.setSelectedCell.bind(this);
    this.setMouseCell = this.setMouseCell.bind(this);
    this.pickPiece = this.pickPiece.bind(this);
    this.dragPiece = this.dragPiece.bind(this);
    this.dropPiece = this.dropPiece.bind(this);

    //Eventos del raton
    this.$canvas.addEventListener('mousemove', this.dragPiece);

    this.$canvas.addEventListener('mousedown', this.pickPiece);

    this.$canvas.addEventListener('mouseup', this.dropPiece);
  }

  clearSelections() {
    this.selectedCells.forEach((c) => c.setSelected(false));
    this.selectedCells = [];
  }
  clearAvailableMoves() {
    this.boardMatrix.forEach((file) => {
      file.forEach((cell) => {
        cell.setAvailableMovement(false);
      });
    });
  }

  pickPiece(event: MouseEvent) {
    this.clearSelections();
    if (this.previousCell) return;
    const { offsetX, offsetY } = event;
    const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
    const selectedCell = this.boardMatrix[file][rank];
    if (!selectedCell.piece) return;

    selectedCell.piece.availableMovements([file, rank], this.boardMatrix);

    this.previousCell = selectedCell;
    this.selectedCells.push(selectedCell);
    selectedCell.setSelected(true);
    this.render();
  }

  dragPiece(event: MouseEvent) {
    // console.log({ drag: this.selectedPiece });
  }

  dropPiece(event: MouseEvent) {
    if (!this.previousCell) return;
    const { offsetX, offsetY } = event;
    const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
    const selectedCell = this.boardMatrix[file][rank];

    if (this.previousCell === selectedCell) {
      console.log('Show valid movements');
      this.previousCell = null;
      this.clearSelections();
      this.render();
      return;
    }

    if (!selectedCell.availableMove) {
      this.previousCell = null;
      this.render();
      return;
    }

    selectedCell.setPiece(this.previousCell.piece);
    this.selectedCells.push(selectedCell);

    this.previousCell.setPiece(null);
    this.previousCell = null;
    selectedCell.setSelected(true);

    // this.flip = !this.flip;
    this.clearAvailableMoves();

    this.render();
  }

  mouseCoordinatesToCell(x: number, y: number) {
    let file = Math.floor(x / this.cellWidth);
    let rank = Math.floor(y / this.cellHeight);

    if (this.flip) {
      file = this.files - 1 - file;
      rank = this.ranks - 1 - rank;
    }

    return [file, rank];
  }

  setSelectedCell(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
    const selectedCell = this.boardMatrix[file][rank];
    selectedCell.setSelected(true);
    this.render();
  }

  setMouseCell(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    console.log({ offsetX, offsetY });
    const x = Math.floor(offsetX / this.cellWidth);
    const y = Math.floor(offsetY / this.cellHeight);
    console.log({ cellWidth: this.cellWidth, cellHeight: this.cellHeight });
    console.log({ x, y });
    // const selectedCell = this.boardMatrix[x][y];
    // selectedCell.setSelected(true);
    // console.log(this.boardMatrix);
    // this.render();
  }

  initPlacePiece(x, y, piece) {
    const cell = this.boardMatrix[x][y];
    cell.setPiece(piece);
  }

  render() {
    console.log(this.boardMatrix);
    for (let x = 0; x < this.files; x += 1) {
      for (let y = 0; y < this.ranks; y += 1) {
        let drawX = x;
        let drawY = y;

        if (this.flip) {
          drawX = this.ranks - 1 - drawX;
          drawY = this.files - 1 - drawY;
        }

        let rectColor = this.theme.light;
        let textColor = this.theme.dark;

        if ((drawX + drawY) % 2) {
          rectColor = this.theme.dark;
          textColor = this.theme.light;
        }

        this.ctx.fillStyle = rectColor;
        this.ctx.fillRect(
          drawX * this.cellWidth,
          drawY * this.cellHeight,
          this.cellWidth,
          this.cellHeight,
        );

        // Dibujo de posicion de debug
        this.ctx.fillStyle = textColor;
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'start';
        this.ctx.font = '8px Arial';
        this.ctx.fillText(`[${x};${y}]`, drawX * this.cellWidth + 10, drawY * this.cellHeight + 10);

        //Dibujo de la pieza
        const cell = this.boardMatrix[x][y];

        if (cell.selected) {
          this.ctx.fillStyle = '#FFDC4E';
          this.ctx.fillRect(
            drawX * this.cellWidth,
            drawY * this.cellHeight,
            this.cellWidth,
            this.cellHeight,
          );
        }

        if (cell.availableMove) {
          this.ctx.fillStyle = '#000000';
          this.ctx.globalAlpha = 0.3;
          this.ctx.beginPath();
          this.ctx.arc(
            drawX * this.cellWidth + this.cellWidth / 2,
            drawY * this.cellHeight + this.cellHeight / 2,
            16,
            0,
            2 * Math.PI,
          );
          this.ctx.fill();
          this.ctx.globalAlpha = 1;
        }

        const piece = cell?.piece;

        if (piece) {
          this.ctx.fillStyle = this.pieceTheme[piece.color];
          this.ctx.textBaseline = 'middle';
          this.ctx.textAlign = 'center';
          this.ctx.font = '72px Arial';
          this.ctx.fillStyle = piece.color;
          this.ctx.fillText(
            piece.miau[0],
            drawX * this.cellWidth + this.cellWidth / 2,
            drawY * this.cellHeight + this.cellHeight / 2 + this.pieceOffset,
          );
          this.ctx.fillStyle = this.pieceTheme.dark;
          this.ctx.fillText(
            piece.miau[1],
            drawX * this.cellWidth + this.cellWidth / 2,
            drawY * this.cellHeight + this.cellHeight / 2 + this.pieceOffset,
          );
        }
      }
    }
  }
}

export default Board;