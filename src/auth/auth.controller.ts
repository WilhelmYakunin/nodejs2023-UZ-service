import {
  Controller,
  Post,
  Body,
  HttpCode,
  Req,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { TokenDto } from './dto/tocken.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  signup(@Body() authDto: CreateUserDto) {
    const { login, password } = authDto;
    return this.authService.signup({ login, password });
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() authDto: CreateUserDto) {
    const { login, password } = authDto;
    const user = this.userService.findOneByLogin(login);
    if (!user) throw new ForbiddenException();
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) throw new ForbiddenException();
    return this.authService.login(user);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  refresh(@Req() req) {
    const { userId, refreshToken }: { userId: string; refreshToken: TokenDto } =
      req;
    if (!refreshToken) throw new UnauthorizedException();
    return this.authService.refresh({ userId, refresh: refreshToken });
  }
}
