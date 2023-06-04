import { Module } from '@nestjs/common';
import state from './state';
import { DBEntyties } from './enums';

@Module({})
class DbModule {
  [x: string]: any;
  constructor(state) {
    this.users = state.users;
    this.artists = state.users;
    this.albums = state.users;
    this.tracks = state.users;
    this.favorities = state.users;
  }

  getAllByKey(key) {
    return this[key];
  }

  getEntityChildById(key, id) {
    return this[key].find((included) => included.id === id);
  }

  addOne(key, newEntytiMember) {
    return this[key].push(newEntytiMember);
  }

  change(key, newInfo) {
    const newEntyti = this[key].map((el) =>
      el.id === newInfo.id ? (el = Object.assign(el, newInfo)) : el,
    );
    return (this[key] = newEntyti);
  }

  changeInCaseOfDeletion(key, keyProperty, id) {
    const newEntyti = this[key].map((el) =>
      el[keyProperty] === id
        ? Object.defineProperty(el, keyProperty, {
            value: null,
          })
        : el,
    );
    return (this[key] = newEntyti);
  }

  delete(key, id) {
    return (this[key] = this[key].filter((included) => included.id !== id));
  }

  addToFavs(key, id) {
    return this[DBEntyties.favorities][key].push(id);
  }

  deleteFromFavs(key, id) {
    return (this[DBEntyties.favorities][key] = this[DBEntyties.favorities][
      key
    ].filter((included) => included.id !== id));
  }
}

const db = new DbModule(state);

export default db;
