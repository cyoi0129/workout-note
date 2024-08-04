import { TaskItemType } from '../task/types';

export interface TimeLineDbResponseType {
  menu: number;
  tasks: TaskItemType[];
}

export interface TimeLineStoreType extends TimeLineDbResponseType {
  error: boolean;
}

export interface ChartDataType {
  date: string[];
  weight: number[];
}