export type TokenTypes = 'color' | 'spacing' | 'font' | 'animation' | 'border'
export type Token<A = string, B = string, C = TokenTypes> = { sig: A, val: B, type: C }
export type Tokens<A = string, B = string, C = TokenTypes> = Token<A, B, C>[]
