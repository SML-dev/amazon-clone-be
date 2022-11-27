import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async register(@Body() reqPayload: RegisterUserRequestDto) {
    return this.userService.register(reqPayload);
  }
}
