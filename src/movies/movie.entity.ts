import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({unique: true})
  @ApiProperty()
  title: string;

  @Column({type: 'int'})
  @ApiProperty()
  year: number;

  @Column({type: 'text', nullable: true, default: null, array: true})
  @ApiProperty()
  genres: string[];
}