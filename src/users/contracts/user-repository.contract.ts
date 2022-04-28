import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

export interface UserRepositoryContract {
  create(data: CreateUserDto): Promise<User>;
  findById(_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<User>;
}
