import Dexie, { Table } from 'dexie';
import { GeneralItemType } from './types';
import { StationItemType, MuscleItemType, MenuItemType } from '../features/master/types';
import { TaskItemType } from '../features/task/types';
 
export class MySubClassedDexie extends Dexie {
    line!: Table<GeneralItemType>;
    area!: Table<GeneralItemType>;
    gym!: Table<GeneralItemType>;
    station!: Table<StationItemType>;
    muscle!: Table<MuscleItemType>;
    menu!: Table<MenuItemType>;
    task!: Table<TaskItemType>;
    ranking!: Table<TaskItemType>;

  constructor() {
    super('Workout Note');
    this.version(1).stores({
      line: '++id, name',
      area: '++id, name',
      gym: '++id, name',
      station: '++id, name, lineID',
      muscle: '++id, group, name',
      menu: '++id, name, image, type, target, muscles',
      task: '++id, date, menu, set, rep, weight, size',
      ranking: '++id, date, menu, set, rep, weight, size',
    });
  }
}
 
export const indexeddb = new MySubClassedDexie();