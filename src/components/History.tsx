import { FC, useState, useEffect } from 'react';
import { ListTaskItem } from '../components';
import { selectTaskData, fetchTask, setDate } from '../features/task';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TaskItemType } from '../features/task/types';
import { date2Str } from '../features/task/func';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/history.scss';

const History: FC = () => {
  const dispatch = useAppDispatch();
  const taskDataStore = useAppSelector(selectTaskData);
  const [tasks, setTasks] = useState<TaskItemType[]>(taskDataStore.tasks);
  const [current, setCurrent] = useState<Date>(new Date());
  
  /**
   * 日付の変更プロセス
   * @param date 
   */
  const changeCurrent = (date: Date): void => {
    setCurrent(date);
  };

  useEffect(() => {
    dispatch(setDate(date2Str(current)));
    dispatch(fetchTask(date2Str(current))); // 日付が変わった場合、当該日付のタスクをIndexedDbから取得するように
  }, [current]);

  useEffect(() => {
    setTasks(taskDataStore.tasks);
  });

  return (
    <div className="history">
      <section>
        <Calendar calendarType="gregory" value={current} onClickDay={(e) => changeCurrent(e)} />
      </section>
      <section>
        <ul>
          {tasks.map((item, index) => (
            <ListTaskItem key={index} data={item} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default History;
