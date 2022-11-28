import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginUserRequestDto } from 'src/user/dto/request/login-user.request.dto';
import { UserService } from '../user/user.service';
import { UserResponseDto } from '../user/dto/response/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user === null) {
        return null;
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return null;
      }

      if (!user.isActive) {
        return null;
      }
      return user;
    } catch (e) {
      console.error({ error: e.message });
    }
  }

  async login(existingUser: LoginUserRequestDto, res: Response): Promise<any> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    const token = await this.jwtService.signAsync({ user });
    const secretData = {
      token,
    };
    res
      .cookie('auth-cookie', secretData, { httpOnly: true })
      .json({ msg: `Jesteś zalogowany` });
  }

  async activeAccount(token): Promise<any> {
    const filter = { activeToken: token };
    const update = { activeToken: null, isActive: true };
    return this.userService.findOneAndUpdate(filter, update);
  }
}
