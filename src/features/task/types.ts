import { MenuItemType } from "../master/types";

export interface TaskItemType {
  id?: number;
  date: string;
  menu: number;
  set: number;
  rep: number;
  weight?: number;
  size?: number;
}

export interface TaskItemProps {
  link?: boolean;
  data: TaskItemType;
}

export interface MenuSelectionProps {
  action: (menu: MenuItemType | null) => void;  // TBD
}

export interface TaskStoreType {
	error: boolean;
  date: string;
  tasks: TaskItemType[];
  ranking: TaskItemType[];
}

export interface RankingCheckResult {
  update: boolean;
  id?: number;
}

export interface CopyDates {
  target: string;
  current: string;
}