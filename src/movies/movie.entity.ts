import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({type: 'int'})
  year: number;

  @Column({type: 'text', nullable: true, default: null, array: true})
  genres: string[];
}