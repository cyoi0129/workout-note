import { GeneralItemType, GeneralDbItemType } from '../../app/types';

export interface StationItemType extends GeneralItemType {
  lineID: number;
}

export interface LineStationItemType extends GeneralItemType {
  stations: StationItemType[];
}

export interface StationDbItemType extends GeneralDbItemType {
  LineID: number;
}

export interface MuscleItemType extends GeneralItemType {
  part: string;
}

export interface MuscleDbItemType extends GeneralDbItemType {
  Part: string;
}

export interface MenuItemType {
  id: number;
  name: string;
  image: string;
  type: string;
  target: number;
  muscles: number[];
}

export interface MenuDbItemType {
  Id: number;
  Name: string;
  Image: string;
  Type: string;
  Target: number;
  Muscles: number[];
}

export interface MasterStoreType {
  error: boolean;
  loading: boolean;
  lines: GeneralItemType[];
  areas: GeneralItemType[];
  gyms: GeneralItemType[];
  stations: StationItemType[];
  muscles: MuscleItemType[];
  menus: MenuItemType[];
}

export interface DbMasterResponseType {
  status: number;
  data: {
    Lines: GeneralDbItemType[];
    Areas: GeneralDbItemType[];
    Gyms: GeneralDbItemType[];
    Stations: StationDbItemType[];
    Muscles: MuscleDbItemType[];
    Menus: MenuDbItemType[];
  };
}

export interface StorageMasterResponseType {
  data: {
    lines: GeneralItemType[];
    areas: GeneralItemType[];
    gyms: GeneralItemType[];
    stations: StationItemType[];
    muscles: MuscleItemType[];
    menus: MenuItemType[];
  };
}

export interface StoreMasterResponseType extends StorageMasterResponseType {
  status: number;
}

export interface ItemSelectionProps {
  type: 'area' | 'gym';
  selected: number[];
  action: (selected: number[]) => void;
}

export interface GroupSelectionProps {
  selected: number[];
  action: (selected: number[]) => void;
}

export interface MenuItemProps {
  action: () => void; //TBD
  data: MenuItemType;
}