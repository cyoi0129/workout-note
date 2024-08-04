import { MatchItemType, DbSendMatchItemType,DbMatchItemDataType, MatchItemDataType } from './types';

/**
 *
 * @param data
 * @returns
 */
export const convertApiMatch = (data: DbMatchItemDataType): MatchItemDataType => {
  return {
    id: data.Id,
    requester: data.Requester,
    approver: data.Approver,
    name: data.Name,
    gender: data.Gender,
    brith: data.Brith,
    bp: data.Bp,
    sq: data.Sq,
    dl: data.Sq,
    status: data.Status,
  };
};

/**
 *
 * @param data
 * @returns
 */
export const convertApiMatchList = (data: DbMatchItemDataType[]): MatchItemDataType[] => {
  const result: MatchItemDataType[] = [];
  data.forEach((item) => {
    result.push(convertApiMatch(item));
  });
  return result;
};

/**
 *
 * @param data
 * @returns
 */
export const convert2SendMatch = (data: MatchItemType): DbSendMatchItemType => {
  return {
    Requester: data.requester,
    Approver: data.approver,
    Status: data.status,
  };
};
