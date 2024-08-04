import { DbUserDataType, UserDataType } from './types';

/**
 * ストア格納用のユーザーデータへ変換
 * @param data
 * @returns
 */

export const convertApiUserData = (data: DbUserDataType): UserDataType => {
  return {
    id: data.UserID,
    name: data.Name,
    gender: data.Gender,
    brith: data.Brith,
    stations: data.Stations,
    areas: data.Areas,
    gyms: data.Gyms,
    times: data.Times,
    bp: data.Bp,
    sq: data.Sq,
    dl: data.Dl,
  };
};

/**
 * サーバー送信用のユーザーデータへ変換
 * @param data 
 * @returns 
 */
export const convert2ApiUserData = (data: UserDataType): DbUserDataType => {
  return {
    Id: data.id,
    UserID: data.id,
    Name: data.name,
    Gender: data.gender,
    Brith: data.brith,
    Stations: data.stations,
    Areas: data.areas,
    Gyms: data.gyms,
    Times: data.times,
    Bp: data.bp,
    Sq: data.sq,
    Dl: data.dl
  };
}