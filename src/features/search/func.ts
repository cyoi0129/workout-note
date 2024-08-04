import { convertApiUserData } from '../user/func';
import { DbUserDataType, UserDataType } from '../user/types';

/**
 * Apiのデータを変換
 * @param data 
 * @returns 
 */
export const convertApiSearchData = (data: DbUserDataType[]): UserDataType[] => {
  const result: UserDataType[] = [];
  data.forEach((item) => {
    result.push(convertApiUserData(item));
  });
  return result;
};
