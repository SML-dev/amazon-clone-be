import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserDocument } from './schemas/user.schema';
import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';
import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  userDetails(user: UserDocument): UserResponseDto {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(user: RegisterUserRequestDto): Promise<UserResponseDto> {
    const newUser = new this.userModel(user);
    newUser.password = await this.hashPassword(newUser.password);
    newUser.activeToken = randomToken.generate(16);
    await newUser.save();
    return this.userDetails(newUser);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async register(reqPayload: RegisterUserRequestDto): Promise<UserResponseDto> {
    const { email } = reqPayload;
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      return { error: 'Email został już użyty podczas rejestracji' };
    }
    return this.create(reqPayload);
  }

  // async getUserById(id: string): Promise<UserResponseDto> {
  //   const user = await this.userModel.findOne({ id });
  //   if (!user) {
  //     throw new Error(`User ${id} is not found`);
  //   }
  //   return this.userDetails(user);
  // }
}
