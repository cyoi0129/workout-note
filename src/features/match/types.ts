export interface MatchItemType {
  id: number;
  requester: number;
  approver: number;
  status: string;
}

export interface MatchItemDataType extends MatchItemType {
  name: string;
  gender: string;
  brith: number;
  bp: number;
  sq: number;
  dl: number;
}

export interface DbSendMatchItemType {
  Requester: number;
  Approver: number;
  Status: string;
}

export interface DbMatchItemType extends DbSendMatchItemType {
  Id: number;
}

export interface DbMatchItemDataType extends DbMatchItemType {
  Name: string;
  Gender: string;
  Brith: number;
  Bp: number;
  Sq: number;
  Dl: number;
}

export interface MatchStoreType {
  error: boolean;
  loading: boolean;
  matches: MatchItemDataType[];
  exists: number[];
}

export interface ApiExistResponseType {
  data: number[];
  status: number;
}

export interface ApiMatchListResponseType {
  data: MatchItemDataType[];
  status: number;
}

export interface ApiMatchResponseType {
  data: MatchItemType;
  status: number;
}

export interface MatchResultItemProps {
  data: MatchItemDataType;
}

export interface UpdateMatchModalProps {
  action: (status: string) => void;
}