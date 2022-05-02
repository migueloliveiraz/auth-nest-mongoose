import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (userExist) throw new BadRequestException('No user has been recorded.');

    const newUser = {
      ...createUserDto,
    };

    return await this.usersRepository.create(newUser);
  }

  async findById(id: string) {
    const userFound = await this.usersRepository.findById(id);

    if (!userFound) throw new NotFoundException('User not found.');

    return userFound;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();

    if (!users) throw new NotFoundException('Not found users.');

    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('User not found!');

    await this.usersRepository.update(id, updateUserDto);

    return 'User successfully updated!';
  }

  async remove(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException('User not found!');

    await this.usersRepository.remove(id);

    return 'User successfully removed!';
  }
}
