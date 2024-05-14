import Dexie, { Table } from 'dexie';
import { MasterItemType, MuscleType, WorkoutType } from '../features/master/types';
import { TaskItemType } from '../features/task/types';
 
export class MySubClassedDexie extends Dexie {
    type!: Table<WorkoutType>;
    muscle!: Table<MuscleType>;
    master!: Table<MasterItemType>;
    task!: Table<TaskItemType>;
    ranking!: Table<TaskItemType>;

  constructor() {
    super('workoutNote');
    this.version(1).stores({
      type: '++id, name',
      muscle: '++id, group, name',
      master: '++id, name, image, type, target, muscles',
      task: '++id, date, master, set, rep, weight, size',
      ranking: '++id, date, master, set, rep, weight, size',
    });
  }
}
 
export const indexeddb = new MySubClassedDexie();