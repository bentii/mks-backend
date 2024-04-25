import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();
    if (movies.length === 0) {
      throw new HttpException('Não há filmes cadastrados', HttpStatus.NOT_FOUND);
    }
    return movies;
  }

  @Get(':title')
  async findOne(@Param('title') title: string): Promise<Movie> {
    const movie = await this.moviesService.findOne(title);
    if (!movie) {
      throw new HttpException('Filme não cadastrado', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    const newMovie = await this.moviesService.create(movie);
    if (!newMovie) {
      throw new HttpException('Erro ao cadastrar filme', HttpStatus.BAD_REQUEST);
    }
    return newMovie;
  }

  @Put(':title')
  async update(
    @Param('title') title: string,
    @Body() movie: Movie,
  ): Promise<Movie> {
    const updatedMovie = await this.moviesService.update(title, movie);
    if (!updatedMovie) {
      throw new HttpException('Alteração falhou', HttpStatus.BAD_REQUEST);
    }
    return updatedMovie;
  }

  @Delete(':title')
  async delete(@Param('title') title: string): Promise<void> {
    const movie = await this.moviesService.findOne(title);
    if (!movie) {
      throw new HttpException('Filme não cadastrado', HttpStatus.NOT_FOUND);
    }
  }
}
