import { Body, Controller, Delete, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ReqUser } from '../auth/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete('me')
  async delete(@ReqUser() user: User): Promise<void> {
    await this.usersService.delete(user.id);
  }
}
