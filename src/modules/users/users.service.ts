import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomBytes } from 'node:crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email, isActive: true });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = randomBytes(32).toString('hex');
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      isActive: true,
    });

    return this.usersRepository.save(user).then((user) => {
      user.password = password;
      return user;
    });
  }

  async delete(userId: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    user.isActive = false;
    await this.usersRepository.save(user);
  }
}
