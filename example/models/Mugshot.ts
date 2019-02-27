import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

export class Mugshot extends Typegoose {
    @prop()
    name: string;

    @prop()
    age: number;

    @prop()
    charges?: string;

    @prop()
    imgUrl?: string;

    @prop()
    state: string;

    @prop()
    county: string;

    @prop()
    url: string;
}

export const MugshotModel = new Mugshot().getModelForClass(Mugshot);
