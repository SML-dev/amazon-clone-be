import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  error?: string;

  @IsBoolean()
  active?: boolean;

  activeToken?: string | null;
}
