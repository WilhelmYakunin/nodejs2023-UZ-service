import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
config();
import { env } from 'process';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/user/user.module';

@Injectable()
export class AuthService {
  [x: string]: any;
  async signup(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const hashPassword = await hash(password, +env.CRYPT_SALT);
    const { create } = new UserService();
    return create({
      login: login,
      password: hashPassword,
    });
  }

  async login(user) {
    const {
      JWT_SECRET_KEY,
      TOKEN_EXPIRE_TIME,
      JWT_SECRET_REFRESH_KEY,
      TOKEN_REFRESH_EXPIRE_TIME,
    } = env;
    const payload = { sub: user.id, login: user.login };
    const jwt = new JwtService();

    return {
      accessToken: jwt.sign(payload, {
        secret: JWT_SECRET_KEY,
        expiresIn: TOKEN_EXPIRE_TIME,
      }),
      refreshToken: jwt.sign(payload, {
        secret: JWT_SECRET_REFRESH_KEY,
        expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refresh({ userId, refresh }) {
    const { findOne } = new UserService();
    const user: User = findOne(userId);
    if (!user) throw new ForbiddenException();

    const jwt = new JwtService();
    const payload = jwt.decode(refresh.refreshToken) as JwtPayload;
    const hasExpired = payload.exp < new Date().getTime() / 1000;
    if (hasExpired) throw new ForbiddenException();

    const valid = jwt.verify(refresh.refreshToken, {
      secret: env.JWT_SECRET_REFRESH_KEY,
    });
    if (!valid) throw new ForbiddenException();

    return await this.login(user);
  }
}
