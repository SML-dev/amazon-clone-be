import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../../decorators/compare.decorator';

export class RegisterUserRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  name: string;

  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @Match('password')
  @IsString()
  confirmPassword: string;
}
