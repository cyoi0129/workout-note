export interface UserLoginRequestType {
  email: string;
  password: string;
}

export interface DbUserResponseType {
	status: number;
	user: string;
}

export interface UserStoreType {
	error: boolean;
  login: boolean;
  user: string;
}
