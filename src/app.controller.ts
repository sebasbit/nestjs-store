import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { Public } from './modules/auth/decorators/public.decorator';
import { ReqUser } from './modules/auth/decorators/user.decorator';
import { User } from './modules/users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@ReqUser() user: User) {
    return this.authService.login(user);
  }
}
