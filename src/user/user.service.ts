import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDocument } from './schemas/user.schema';
import { RegisterUserRequestDto } from './dto/request/register-user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  private userDetails(user: UserDocument): UserResponseDto {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async create(user: RegisterUserRequestDto): Promise<UserResponseDto> {
    const newUser = new this.userModel(user);
    await newUser.save();
    return this.userDetails(newUser);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new Error(`Email ${user.email} is already exists`);
    }
    return user;
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new Error(`User ${id} is not found`);
    }
    return this.userDetails(user);
  }
}
