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
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiBody} from '@nestjs/swagger';


@ApiTags('filmes')
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @Get()
  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();
    if (movies.length === 0) {
      throw new HttpException(
        'Não há filmes cadastrados',
        HttpStatus.NOT_FOUND,
      );
    }
    return movies;
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @Get(':title')
  async findOne(@Param('title') title: string): Promise<Movie> {
    const movie = await this.moviesService.findOne(title);
    if (!movie) {
      throw new HttpException('Filme não cadastrado', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  @Post()
  @ApiBody({ type: Movie })
  async create(@Body() movie: Movie): Promise<Movie> {
    try {
      
      if (!movie.title || !movie.year || !movie.genres) {
        throw new HttpException(
          'Dados inválidos.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newMovie = await this.moviesService.create(movie);
      if (!newMovie) {
        throw new HttpException(
          'Erro ao cadastrar filme',
          HttpStatus.BAD_REQUEST,
        );
      }
      return newMovie;
    } catch (error) {
      throw new HttpException(
        'Erro ao processar os dados do filme',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
