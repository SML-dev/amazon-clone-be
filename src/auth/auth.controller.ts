import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserRequestDto } from 'src/user/dto/request/register-user.request.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async register(
    @Body() user: RegisterUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.register(user);
  }
}
