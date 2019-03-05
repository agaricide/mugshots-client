import { prop, Typegoose } from 'typegoose';

export class County extends Typegoose {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public state: string;

  @prop({ required: true })
  public url: string;
}

export const CountyModel = new County().getModelForClass(County);
