import Board from './classes/Board';
import Pawn from './classes/pieces/Pawn';
import Rook from './classes/pieces/Rook';
import Knight from './classes/pieces/Knight';
import Bishop from './classes/pieces/Bishop';
import Queen from './classes/pieces/Queen';
import King from './classes/pieces/King';

import { Color } from './types';

const WIDTH = 800;
const HEIGHT = 800;

const FILES = 8;
const RANKS = 8;

const theme = {
    light:'#fbce9c',
    dark:'#d38d47'
};

const pieceTheme = {
  light: '#FFFFFF',
  dark: '#000000',
};

const board = new Board(WIDTH, HEIGHT, FILES, RANKS, theme, pieceTheme);

// Ubicar las piezas
for (let i = 0; i < RANKS; i += 1) {
  board.initPlacePiece(i, 1, new Pawn(Color.dark));
  board.initPlacePiece(i, 6, new Pawn(Color.light));
}

for (let i = 0; i < 2; i += 1) {
  board.initPlacePiece(0, i * 7, new Rook(i ? Color.light : Color.dark));
  board.initPlacePiece(7, i * 7, new Rook(i ? Color.light : Color.dark));
  board.initPlacePiece(1, i * 7, new Knight(i ? Color.light : Color.dark));
  board.initPlacePiece(6, i * 7, new Knight(i ? Color.light : Color.dark));
  board.initPlacePiece(2, i * 7, new Bishop(i ? Color.light : Color.dark));
  board.initPlacePiece(5, i * 7, new Bishop(i ? Color.light : Color.dark));
  board.initPlacePiece(3, i * 7, new Queen(i ? Color.light : Color.dark));
  board.initPlacePiece(4, i * 7, new King(i ? Color.light : Color.dark));
}

board.render();