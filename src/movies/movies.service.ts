import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async create(movie: Movie): Promise<Movie> {
    const newMovie = this.moviesRepository.create(movie);
    return this.moviesRepository.save(newMovie);
  }

  async update(id: number, movie: Movie): Promise<Movie> {
    await this.moviesRepository.update(id, movie);
    return await this.moviesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }
}
