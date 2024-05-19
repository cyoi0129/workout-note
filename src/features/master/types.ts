import { GeneralItemType, GeneralDbItemType } from "../../app/types";

export type WorkoutType = GeneralItemType;
export type WorkoutDbType = GeneralDbItemType;

export interface MuscleType extends GeneralItemType {
  part: string;
}

export interface MuscleDbType extends GeneralDbItemType {
  Part: string;
}

export type MuscleGroupType = '胸'|'背中'|'肩'|'腕'|'腹'|'足';

export interface MasterItemType {
  id: number;
  name: string;
  image: string;
  type: number;
  target: number;
  muscles: number[];
}

export interface MasterDbItemType {
  Id: number;
  Name: string;
  Image: string;
  Type: number;
  Target: number;
  Muscles: number[];
}

export interface MasterItemProps {
  action?: any;
  data: MasterItemType;
}

export interface MasterStoreType {
	error: boolean;
  types: WorkoutType[];
  muscles: MuscleType[];
  masters: MasterItemType[];
}

export interface DbMasterResponseType {
  status: number;
  types: WorkoutDbType[];
  muscles: MuscleDbType[];
  masters: MasterDbItemType[];
}

export interface StorageMasterResponseType {
  types: WorkoutType[];
  muscles: MuscleType[];
  masters: MasterItemType[];
}

export interface StoreMasterResponseType extends StorageMasterResponseType {
  status: number;
}