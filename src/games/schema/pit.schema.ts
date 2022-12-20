import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Piece } from './piece.schema';


@Schema({_id: false})
export class Pit extends Document {
  @Prop()
  pitNumber: number;
  
  @Prop([Piece])
  pieces: Piece[];
  
}