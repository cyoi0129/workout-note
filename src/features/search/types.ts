import { UserDataType, DbUserDataType } from '../user/types';

export interface SearchStoreType {
  error: boolean;
  loading: boolean;
  gyms: number[];
  areas: number[];
  stations: number[];
  data: UserDataType[];
}

export interface DbFilterType {
  Gyms: number[];
  Areas: number[];
  Stations: number[];
}

export interface ApiSearchResultType {
  data: DbUserDataType[];
  status: number;
}

export interface StoreSearchResultType {
  data: UserDataType[];
  gyms: number[];
  areas: number[];
  stations: number[];
  status: number;
}

export interface SearchResultItemProps {
  data: UserDataType;
}

export interface SendLikeModalProps {
  action: (status: string) => void;
}