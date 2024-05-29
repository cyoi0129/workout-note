import { TimeLineDbResponseType } from './types';
import { indexeddb } from '../../app/storage';

/**
 * IndexedDbから指定マスターのタスクリスト取得
 * @param master
 * @returns
 */
export const fetchStorageTimeLine = async (master: number): Promise<TimeLineDbResponseType> => {
  const collection = indexeddb.task.filter((task) => task.master === master);
  const tasks = await collection.toArray();
  const sortedTasks = tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return {
    master: master,
    tasks: sortedTasks
  }
};