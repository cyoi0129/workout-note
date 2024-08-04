import { DbMasterResponseType, StoreMasterResponseType, StationItemType, StationDbItemType, LineStationItemType, MenuItemType, MenuDbItemType, MuscleItemType, MuscleDbItemType } from './types';
import { GeneralItemType, GeneralDbItemType } from '../../app/types';

/**
 * API側のデータフォーマットをストア格納のデータフォーマットへ変換
 * @param data
 * @returns
 */
export const convertDbMasterResponse = (response: DbMasterResponseType): StoreMasterResponseType => {
  const convertItem = (item: GeneralDbItemType): GeneralItemType => {
    return {
      id: item.Id,
      name: item.Name,
    };
  };
  const convertStation = (item: StationDbItemType): StationItemType => {
    return {
      id: item.Id,
      lineID: item.LineID,
      name: item.Name,
    };
  };

  const convertMenu = (item: MenuDbItemType): MenuItemType => {
    return {
      id: item.Id,
      name: item.Name,
      image: item.Image,
      type: item.Type,
      target: item.Target,
      muscles: item.Muscles,
    };
  };

  const convertMuscle = (item: MuscleDbItemType): MuscleItemType => {
    return {
      id: item.Id,
      part: item.Part,
      name: item.Name,
    };
  };

  const lines: GeneralItemType[] = response.data.Lines.map((item) => convertItem(item));
  const areas: GeneralItemType[] = response.data.Areas.map((item) => convertItem(item));
  const gyms: GeneralItemType[] = response.data.Gyms.map((item) => convertItem(item));
  const stations: StationItemType[] = response.data.Stations.map((item) => convertStation(item));
  const menus: MenuItemType[] = response.data.Menus.map((item) => convertMenu(item));
  const muscles: MuscleItemType[] = response.data.Muscles.map((item) => convertMuscle(item));

  return {
    status: response.status,
    data: {
      lines: lines,
      areas: areas,
      gyms: gyms,
      stations: stations,
      menus: menus,
      muscles: muscles,
    },
  };
};

/**
 * 路線・駅配列の作成
 * @param lines
 * @param stations
 * @returns
 */
export const createLineStationArray = (lines: GeneralItemType[], stations: StationItemType[]): LineStationItemType[] => {
  const result: LineStationItemType[] = [];
  lines.forEach((line) => {
    const target_stations: StationItemType[] = stations.filter((station) => station.lineID === line.id);
    result.push({
      id: line.id,
      name: line.name,
      stations: target_stations,
    });
  });
  return result;
};
