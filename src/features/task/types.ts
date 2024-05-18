export interface TaskItemType {
  id?: number;
  date: string;
  master: number;
  set: number;
  rep: number;
  weight?: number;
  size?: number;
}

export interface TaskItemProps {
  link?: boolean;
  data: TaskItemType;
}

export interface MasterSelectionProps {
  action: any;
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

export interface RemoveAlertProps {
  action: any;
  id: number;
}