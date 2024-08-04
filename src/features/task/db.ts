import { TaskItemType, CopyDates } from './types';
import { indexeddb } from '../../app/storage';

/**
 * IndexedDbから指定日付のタスクリスト取得
 * @param date
 * @returns
 */
export const fetchStorageTask = async (date: string): Promise<TaskItemType[]> => {
  const collection = indexeddb.task.filter((task) => task.date === date);
  const tasks = await collection.toArray();
  return tasks;
};

/**
 * IndexedDbからランキング情報の取得
 * @returns
 */
export const fetchStorageRanking = async (): Promise<TaskItemType[]> => {
  const rankings = await indexeddb.ranking.toArray();
  return rankings;
};

/**
 * IndexedDbにタスクを追加
 * @param task
 * @returns
 */
export const addStorageTask = async (task: TaskItemType): Promise<TaskItemType> => {
  const id = await indexeddb.task.add(task);
  const result: TaskItemType = {
    id: id,
    menu: task.menu,
    set: task.set,
    rep: task.rep,
    date: task.date,
    weight: task.weight,
    size: task.size,
  };
  return result;
};

/**
 * IndexedDbに複数タスクを追加
 * @param task
 * @returns
 */
export const addStorageTasks = async (tasks: TaskItemType[]): Promise<TaskItemType[]> => {
  const date = tasks[0].date;
  const collection = indexeddb.task.filter((task) => task.date === date);
  await indexeddb.task.bulkAdd(tasks);
  const result = await collection.toArray();
  return result;
};

/**
 * IndexedDbに複数タスクを複製
 * @param dates
 * @returns
 */
export const copyStorageTasks = async (dates: CopyDates): Promise<TaskItemType[]> => {
  const targetList = indexeddb.task.filter((task) => task.date === dates.target);
  const resultList = indexeddb.task.filter((task) => task.date === dates.current);
  const tasks = await targetList.toArray();
  const data: TaskItemType[] = [];
  tasks.forEach((item) =>
    data.push({
      date: dates.current,
      menu: item.menu,
      set: item.set,
      rep: item.rep,
      weight: item.weight,
      size: item.size,
    })
  );
  await indexeddb.task.bulkAdd(data);
  const result = await resultList.toArray();
  return result;
};

/**
 * IndexedDbのタスクを更新
 * @param task
 * @returns
 */
export const updateStorageTask = async (task: TaskItemType): Promise<TaskItemType> => {
  try {
    await indexeddb.task.put(task);
  } catch (error) {
    console.log(error);
  }
  return task;
};

/**
 * IndexedDbのタスクを削除
 * @param id
 * @returns
 */
export const removeStorageTask = async (id: number): Promise<number> => {
  await indexeddb.task.delete(id);
  return id;
};

/**
 * IndexedDbのランキングを更新
 * @param menu
 * @returns
 */
export const updateStorageRanking = async (menu: number): Promise<TaskItemType[]> => {
  const tasks_query = indexeddb.task.filter((task) => task.menu === menu);
  const ranking_query = indexeddb.ranking.filter((task) => task.menu === menu);
  const target_tasks = await tasks_query.toArray();
  const target_ranking = await ranking_query.first();
  const tasks: TaskItemType[] = target_tasks.sort((a, b) => Number(b.weight) - Number(a.weight));
  const maxTask: TaskItemType = tasks[0];
  if (!target_ranking) {
    // 新規追加の場合
    await indexeddb.ranking.put(maxTask);
  } else if (target_tasks.length === 0) {
    // 既存削除の場合
    await indexeddb.ranking.delete(target_ranking.id);
  } else if (Number(target_ranking.weight) !== Number(maxTask.weight)) {
    // 既存更新の場合
    const newRankingItem: TaskItemType = maxTask;
    newRankingItem.id = target_ranking.id;
    await indexeddb.ranking.update(target_ranking.id, newRankingItem);
  }
  const rankings = await indexeddb.ranking.toArray();
  return rankings;
};

/**
 * IndexedDbのランキングを削除
 * @param id
 * @returns
 */
export const removeStorageRanking = async (id: number): Promise<number> => {
  await indexeddb.ranking.delete(id);
  return id;
};
