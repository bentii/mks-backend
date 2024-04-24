import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        const movies = await this.moviesService.findAll();
        if (!movies) {
            this.handleError('findAll', '404', 'Não há filmes cadastrados');
        }
        return movies;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Movie> {
        const movie = await this.moviesService.findOne(id);
        if (!movie) {
            this.handleError('findOne', '404', 'Filme não encontrado');
        }
        return movie;
    }
    
    @Post()
    async create(@Body() movie: Movie): Promise<Movie> {
        const newMovie = await this.moviesService.create(movie);
        if (!newMovie) {
            this.handleError('create', '400', 'Erro ao cadastrar filme');
        }
        return newMovie;
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
        const updatedMovie = await this.moviesService.update(id, movie);
        if (!updatedMovie) {
            this.handleError('update', '400', 'Erro ao atualizar filme');
        }
        return updatedMovie;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const movie = await this.moviesService.findOne(id);
        if (!movie) {
            this.handleError('delete', '400', 'Erro ao remover filme');
        }
    }

    handleError(error: any, code: string, description: string) {
        console.error(`Error in ${code}: ${description}`);
        console.error(error);
    }
}
