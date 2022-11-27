import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoginUserResponseDto } from '../user/dto/response/login-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Req() { user },
    @Res() res: Response,
  ): Promise<LoginUserResponseDto> {
    return this.authService.login(user, res);
  }
}

// @Post('signup')
// async register(
//   @Body() user: RegisterUserRequestDto,
// ): Promise<UserResponseDto> {
//   return this.authService.register(user);
// }

// @Post('login')
// async login(
//   @Body() { email, password }: LoginUserRequestDto,
// ): Promise<LoginUserResponseDto> {
//   return this.authService.login(email, password);
// }
