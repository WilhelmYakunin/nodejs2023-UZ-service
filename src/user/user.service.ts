import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import state from '../db/db.module';
import { DBEntyties } from 'src/db/enums';

import { v4 } from 'uuid';
import { User } from './user.module';

const usersKey = DBEntyties.users;

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    };
    state.addOne(usersKey, Object.assign({}, newUser));
    delete newUser['password'];
    return newUser;
  }

  findAll() {
    return state.getAllByKey(usersKey);
  }

  findOne(id: string) {
    return state.getEntityChildById(usersKey, id);
  }

  update(newInfo) {
    const { version } = newInfo;

    state.change(
      usersKey,
      Object.assign(newInfo, {
        version: version + 1,
        updatedAt: Number(new Date()),
      }),
    );

    delete newInfo['password'];
    return newInfo;
  }

  remove(id: string) {
    return state.delete(usersKey, id);
  }
}
