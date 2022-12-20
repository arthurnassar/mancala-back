import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { Piece } from './piece.schema';
import { Pit } from './pit.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {

  @Prop({ type: Number,  enum: [ 1, 2 ] })
  turn: 1 | 2;
  
  @Prop({ type: Number,  enum: [ 1, 2 ] })
  gameEnded: 1 | 2;
  
  @Prop()
  pitCount: number;
  
  @Prop([Pit])
  pits: Pit[];
  
  @Prop([Piece])
  p1Pit: Piece[];
  
  @Prop([Piece])
  p2Pit: Piece[];
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  player: User;

}
export const GameSchema = SchemaFactory.createForClass(Game);