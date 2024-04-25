import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
