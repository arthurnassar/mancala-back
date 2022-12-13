import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// TODO ADD IMPORT MONGOOSE WHEN GAME SCHEMA IS READY TO BE REFERENCED
// import * as mongoose from 'mongoose'
// TODO ADD IMPORT OF GAME SCHEMA LATER
// import { Game } from './game.schema.ts'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // ADD A REFERENCE TO THE GAME SCHEMA AFTER (ONE USER CAN HAVE MULTIPLE GAMES)
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
  // games: Game[];
}
export const UserSchema = SchemaFactory.createForClass(User);