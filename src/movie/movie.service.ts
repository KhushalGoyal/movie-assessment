import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/schemas/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto, UpdateMovieDto } from 'src/dto/movie.dto';


@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }

    async createMovie(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
        const newMovie = new this.movieModel(createMovieDto);
        return newMovie.save();
    }

    async getAllMovies(query: string | null): Promise<MovieDocument[]> {
        if (query) {
            return this.movieModel.find(
                { $or: [{ name: { $regex: query, $options: 'i' } }, { genre: { $regex: query, $options: 'i' } }] }
            )
        }
        return this.movieModel.find();
    }

    async updateMovie(movieId: string, updateMovieDto: UpdateMovieDto): Promise<MovieDocument> {
        return this.movieModel.findByIdAndUpdate(movieId, updateMovieDto, { new: true });
    }

    async deleteMovie(movieId: string) : Promise<MovieDocument> {
        return this.movieModel.findByIdAndDelete(movieId);
    }
    
}
