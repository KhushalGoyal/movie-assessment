import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { Auth } from 'src/common/decorator/auth/auth.decorator';
import { CreateMovieDto, UpdateMovieDto } from 'src/dto/movie.dto';

@ApiBearerAuth()
@ApiTags("Movie")
@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService){}
    
    @Get('')
    @Auth('user')
    @ApiOkResponse({ description: 'Movie Details', type: [CreateMovieDto] })
    async getMovies(@Res() response) {
        try {
            const movies = await this.movieService.getAllMovies(null);
            return response.status(HttpStatus.OK).json({
                message: 'Movies found!', movies,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('')
    @Auth('user')
    @ApiOkResponse({ description: 'Movie Details', type: CreateMovieDto })
    async createMovie(@Res() response, @Body() createMovieDto: CreateMovieDto) {
        try {
            const newMovie = await this.movieService.createMovie(createMovieDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Movie has been registered successfully',
                newMovie,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Movie have not registered!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    @Auth('user')
    async updateMovie(@Res() response, @Param('id') MovieId: string,
        @Body() updateMovieDto: UpdateMovieDto) {
        try {
            const existingMovie = await this.movieService.updateMovie(MovieId, updateMovieDto);
            return response.status(HttpStatus.OK).json({
                message: 'Movie has been successfully updated',
                existingMovie,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @Delete('/:id')
    @Auth('user')
    async deleteMovie(@Res() response, @Param('id') MovieId: string) {
        try {
            const deletedMovie = await this.movieService.deleteMovie(MovieId);
            return response.status(HttpStatus.OK).json({
                message: 'Movie deleted successfully',
                deletedMovie,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/search')
    @Auth('user')
    async getMoviesOnQuery(@Res() response, @Query('q') query: string) {
        try {
            const movies = await this.movieService.getAllMovies(query);
            return response.status(HttpStatus.OK).json({
                message: 'Movies found!', movies,
            });
        } catch (err) {
            return response.status(err?.status || 500).json(err.message);
        }
    }
}
