import { MasterItemType, DbMasterResponseType, StoreMasterResponseType, MuscleType, WorkoutType, StorageMasterResponseType } from './types';
import { indexeddb } from '../../app/storage';
import { convertDbResponse } from './func';
import { api_base } from '../../app/util';
import Cookies from 'js-cookie';

/**
 * APIからマスターデータの取得
 * @returns 
 */
export const fetchDbData = async (): Promise<StoreMasterResponseType> => {
  const targets = ['/types', '/muscles', '/masters/1'];
  let response: DbMasterResponseType = {
    status: 0,
    types: [],
    muscles: [],
    masters: [],
  };
  await Promise.all(
    targets.map((target) =>
      fetch(api_base + target, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: String(Cookies.get('user')),
        },
      })
        .then((result) => result.json())
        .catch((error) => {
          console.error(error);
          response.status = 1;
        })
    )
  ).then((results) => {
    if (!results[0] || !results[1] || !results[2] || results[0].status !== 0 || results[1].status !== 0 || results[2].status !== 0) {
      response.status = 1;
    } else {
      response.types = results[0].data;
      response.muscles = results[1].data;
      response.masters = results[2].data;
    }
  });
  return convertDbResponse(response);
};

/**
 * 取得したマスターデータをIndexedDbに保存
 * @param typeList 
 * @param muscleList 
 * @param masterList 
 */
export const intialIndexedDb = async (typeList: WorkoutType[], muscleList: MuscleType[], masterList: MasterItemType[]): Promise<void> => {
  try {
    await indexeddb.type.bulkAdd(typeList);
    await indexeddb.muscle.bulkAdd(muscleList);
    await indexeddb.master.bulkAdd(masterList);
  } catch (error) {
    console.log(error);
  }
};

/**
 * IndexedDbからマスターデータの取得
 * @returns 
 */
export const fetchIndexedDbMasterData = async (): Promise<StorageMasterResponseType> => {
  const types = await indexeddb.type.toArray();
  const muscles = await indexeddb.muscle.toArray();
  const masters = await indexeddb.master.toArray();
  return {
    types: types,
    muscles: muscles,
    masters: masters,
  };
};
