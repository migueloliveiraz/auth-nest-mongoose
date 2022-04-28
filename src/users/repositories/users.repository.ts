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

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find({}).select('-password');
  }

  async update(_id: string, data: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
