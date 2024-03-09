import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/schemas/movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: Movie.name, schema: MovieSchema}])],
    providers: [MovieService],
    controllers: [MovieController]
})
export class MovieModule {}
