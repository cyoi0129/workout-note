import { MasterItemType, DbMasterResponseType, StoreMasterResponseType, MasterDbItemType, MuscleDbType, MuscleType, WorkoutType, WorkoutDbType } from './types';

/**
 * API側のデータフォーマットをストア格納のデータフォーマットへ変換
 * @param data 
 * @returns 
 */
export const convertDbResponse = (data: DbMasterResponseType): StoreMasterResponseType => {
  const convertMaster = (item: MasterDbItemType): MasterItemType => {
    return {
      id: item.Id,
      name: item.Name,
      image: item.Image,
      type: item.Type,
      target: item.Target,
      muscles: item.Muscles,
    };
  };
  const convertType = (item: WorkoutDbType): WorkoutType => {
    return {
      id: item.Id,
      name: item.Name,
    };
  };
  const convertMuscle = (item: MuscleDbType): MuscleType => {
    return {
      id: item.Id,
      part: item.Part,
      name: item.Name,
    };
  };
  const masters: MasterItemType[] = data.masters.map((item) => convertMaster(item));
  const types: WorkoutType[] = data.types.map((item) => convertType(item));
  const muscles: MuscleType[] = data.muscles.map((item) => convertMuscle(item));
  return {
    status: data.status,
    types: types,
    muscles: muscles,
    masters: masters,
  };
};

