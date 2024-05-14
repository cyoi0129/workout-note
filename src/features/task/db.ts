import { TaskItemType } from './types';
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
    master: task.master,
    set: task.set,
    rep: task.rep,
    date: task.date,
    weight: task.weight,
    size: task.size,
  };
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
 * IndexedDbのランキングを更新
 * @param task 
 * @returns 
 */
export const updateStorageRanking = async (task: TaskItemType): Promise<TaskItemType[]> => {
  try {
    await indexeddb.ranking.put(task);
  } catch (error) {
    console.log(error);
  }
  const rankings = await indexeddb.ranking.toArray();
  return rankings;
};
