import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserRequestDto } from 'src/user/dto/request/register-user.request.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LoginUserRequestDto } from 'src/user/dto/request/login-user.request.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(user: RegisterUserRequestDto): Promise<UserResponseDto> {
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error(`User ${user.email} already exists`);
    } else {
      user.password = await this.hashPassword(user.password);
      return this.userService.create(user);
    }
  }
}
