import { Body, Controller, Delete, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ReqUser } from '../auth/decorators/user.decorator';
import { ApiConflictResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  @ApiConflictResponse({ description: 'Email is already registered' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete('me')
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@ReqUser() user: User): Promise<void> {
    await this.usersService.delete(user.id);
  }
}
