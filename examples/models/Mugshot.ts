import { prop, Typegoose } from 'typegoose';

export class Mugshot extends Typegoose {
  @prop()
  public name: string;

  @prop()
  public age: number;

  @prop()
  public charge?: string;

  @prop()
  public imgUrl?: string;

  @prop()
  public state?: string;

  @prop()
  public county?: string;

  @prop()
  public url: string;
}

export const MugshotModel = new Mugshot().getModelForClass(Mugshot);
