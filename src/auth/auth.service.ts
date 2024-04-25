import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      return this.jwtService.sign({ id: user.id, email: user.email });
    }

    return null;
  }
}
