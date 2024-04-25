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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    if (users.length === 0) {
      throw new HttpException('Não há usuários cadastrados', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    const newUser = await this.usersService.create(user);
    if (!newUser) {
      throw new HttpException('Erro ao cadastrar', HttpStatus.BAD_REQUEST);
    }
    return newUser;
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() user: User,
  ): Promise<User> {
    const updatedUser = await this.usersService.update(email, user);
    if (!updatedUser) {
      throw new HttpException('Alteração falhou', HttpStatus.BAD_REQUEST);
    }
    return updatedUser;
  }

  @Delete(':email')
  async delete(@Param('email') email: string): Promise<void> {
    const deletedUser = await this.usersService.findOne(email);
    if (!deletedUser) {
      throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND);
    }
    return this.usersService.delete(`Usuário ${email} deletado com sucesso`);
  }
}
