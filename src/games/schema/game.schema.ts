import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Piece } from './piece.schema';
import { Pit } from './pit.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop()
  id: number;

  @Prop({ type: Number,  enum: [ 1, 2 ] })
  turn: number;
  
  @Prop({ type: Number,  enum: [ 1, 2 ] })
  gameEnded: number;
  
  @Prop()
  pitCount: number;
  
  @Prop([Pit])
  pits: [Pit];
  
  @Prop([Piece])
  p1Pit: [Piece];
  
  @Prop([Piece])
  p2Pit: [Piece];
  
  @Prop([Piece])
  pieces: [Piece];
  
  @Prop()
  player: number;

}
export const GameSchema = SchemaFactory.createForClass(Game);