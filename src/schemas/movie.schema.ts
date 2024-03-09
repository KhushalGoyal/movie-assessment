import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
    @Prop({
        required: true,
        unique: true
    })
    name: string;

    @Prop({
        required: true,
    })
    genre: string;

    @Prop({
        required: true
    })
    rating: number;

    @Prop({
        required: true
    })
    streamingLink: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);