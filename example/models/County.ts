import { prop, Typegoose } from 'typegoose';

export class County extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    state: string;

    @prop({ required: true })
    url: string;
}

export const CountyModel = new County().getModelForClass(County);
