import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({
    message: 'RefreshToken is a string field',
  })
  @IsNotEmpty({ message: 'RefreshToken is required' })
  public refreshToken: string;
}

