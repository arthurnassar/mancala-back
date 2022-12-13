import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({_id: false})
export class Piece extends Document {
  @Prop()
  pieceNumber: Number;
  
}