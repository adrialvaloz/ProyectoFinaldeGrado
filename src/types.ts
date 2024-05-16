export interface Theme {
    light: string,
    dark: string,
  }
  
  export enum Color {
    light = 'light',
    dark = 'dark',
  }
  
  export enum PieceType {
    king = 'k',
    queen = 'q',
    rook = 'r',
    bishop = 'b',
    knight = 'n',
    pawn = '',
  }