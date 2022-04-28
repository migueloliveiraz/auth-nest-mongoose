import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserRepositoryContract } from '../contracts/user-repository.contract';

@Injectable()
export class UsersRepository implements UserRepositoryContract {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = new this.userModel(createUserDto);

    return userCreated.save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findById(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({}).select('-password');
  }

  async update(_id: string, data: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });
  }
}
