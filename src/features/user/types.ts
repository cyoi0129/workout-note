export interface UserDataType {
  id: number;
  name: string;
  gender: string;
  brith: number;
  stations: number[];
  areas: number[];
  gyms: number[];
  times: string[];
  bp: number;
  sq: number;
  dl: number;
}

export interface UserAccountType {
  id: number;
  email: string;
  password: string;
  token: string;
}

export interface UserStoreType {
  error: boolean;
  loading: boolean;
  login: boolean;
  account: UserAccountType;
  data: UserDataType;
}

export interface UserLoginRequestType {
  email: string;
  password: string;
}

export interface DbUserDataType {
  Id: number;
  UserID: number;
  Name: string;
  Gender: string;
  Brith: number;
  Stations: number[];
  Areas: number[];
  Gyms: number[];
  Times: string[];
  Bp: number;
  Sq: number;
  Dl: number;
}

export interface ApiUserLoginType {
  data: {
    Info: DbUserDataType;
    Token: string;
  };
  status: number;
}

export interface ApiUserDataType {
  data: DbUserDataType;
  status: number;
}

export interface StoreUserDataType {
  data: UserDataType;
  status: number;
  token: string;
}