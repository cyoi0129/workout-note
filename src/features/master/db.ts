import { StoreMasterResponseType, StorageMasterResponseType } from './types';
import { indexeddb } from '../../app/storage';
import { convertDbMasterResponse } from './func';
import { api_base } from '../../app/util';
import offline_master from '../../app/offline.json';
import Cookies from 'js-cookie';

/**
 * APIからマスターデータの取得
 * @returns
 */
export const fetchDbMasterData = async (): Promise<StoreMasterResponseType> => {
  const url: string = api_base + '/masters';
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return convertDbMasterResponse(response);
};

/**
 * APIエラー時jsonファイルからマスターデータの取得
 * @returns
 */
export const fetchJsonMasterData = async (): Promise<StoreMasterResponseType> => {
  const response = JSON.parse(JSON.stringify(offline_master));
  console.log(response);
  return convertDbMasterResponse(response);
};

/**
 * 取得したマスターデータをIndexedDbに保存
 * @param master 
 */
export const intialIndexedDb = async (master: StorageMasterResponseType): Promise<void> => {
  try {
    await indexeddb.line.bulkAdd(master.data.lines);
    await indexeddb.area.bulkAdd(master.data.areas);
    await indexeddb.gym.bulkAdd(master.data.gyms);
    await indexeddb.station.bulkAdd(master.data.stations);
    await indexeddb.muscle.bulkAdd(master.data.muscles);
    await indexeddb.menu.bulkAdd(master.data.menus);
  } catch (error) {
    console.log(error);
  }
};

/**
 * IndexedDbからマスターデータの取得
 * @returns
 */
export const fetchIndexedDbMasterData = async (): Promise<StorageMasterResponseType> => {
  const lines = await indexeddb.line.toArray();
  const areas = await indexeddb.area.toArray();
  const gyms = await indexeddb.gym.toArray();
  const stations = await indexeddb.station.toArray();
  const muscles = await indexeddb.muscle.toArray();
  const menus = await indexeddb.menu.toArray();
  return {
    data: {
      lines: lines,
      areas: areas,
      gyms: gyms,
      stations: stations,
      muscles: muscles,
      menus: menus
    }
  };
};
