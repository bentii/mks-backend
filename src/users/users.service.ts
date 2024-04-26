import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({ ...user, password: hashedPassword });
    const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.save(newUser);
  }

  async update(email: string, user: User): Promise<User> {
    await this.usersRepository.update(email, user);
    const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.findOne({ where: { email } });
  }

  async delete(email: string): Promise<void> {
    await this.usersRepository.delete(email);
  }
}
