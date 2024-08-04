import { TimeLineDbResponseType } from './types';
import { indexeddb } from '../../app/storage';

/**
 * IndexedDbから指定マスターのタスクリスト取得
 * @param menu
 * @returns
 */
export const fetchStorageTimeLine = async (menu: number): Promise<TimeLineDbResponseType> => {
  const collection = indexeddb.task.filter((task) => task.menu === menu);
  const tasks = await collection.toArray();
  const sortedTasks = tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return {
    menu: menu,
    tasks: sortedTasks
  }
};