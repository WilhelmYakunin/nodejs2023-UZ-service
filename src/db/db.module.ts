import { Module } from '@nestjs/common';
import state from './state';
import { DBEntyties } from './enums';

import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

class DbModule {
  [x: string]: any;
  constructor(private prisma: PrismaService) {}

  getAllByKey(key) {
    return this.prisma[key];
  }

  getEntityChildById(key, id) {
    return this.prisma[key].find((included) => included.id === id);
  }

  addOne(key, newEntytiMember) {
    return this.prisma[key].push(newEntytiMember);
  }

  change(key, newInfo) {
    const newEntyti = this.prisma[key].map((el) =>
      el.id === newInfo.id ? (el = Object.assign(el, newInfo)) : el,
    );
    return (this.prisma[key] = newEntyti);
  }

  changeInCaseOfDeletion(key, keyProperty, id) {
    const newEntyti = this.prisma[key].map((el) =>
      el[keyProperty] === id
        ? Object.defineProperty(el, keyProperty, {
            value: null,
          })
        : el,
    );
    return (this.prisma[key] = newEntyti);
  }

  delete(key, id) {
    return (this.prisma[key] = this.prisma[key].filter(
      (included) => included.id !== id,
    ));
  }

  addToFavs(key, item) {
    return this.prisma[DBEntyties.favorities][key].push(item);
  }

  deleteFromFavs(key, id) {
    return (this.prisma[DBEntyties.favorities][key] = this.prisma[
      DBEntyties.favorities
    ][key].filter((included) => included.id !== id));
  }
}

const db = new DbModule(state);

export default db;
