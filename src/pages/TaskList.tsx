import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTaskItem } from '../components';
import { selectTaskData, fetchTask, setDate, fetchRanking } from '../features/task';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TaskItemType } from '../features/task/types';
import { date2Str, str2Date } from '../features/task/func';

import { MdAdd } from "react-icons/md";
import { IoMdCalendar } from 'react-icons/io';
import '../css/tasks.scss';

const TaskList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const taskDataStore = useAppSelector(selectTaskData);
  
  const [tasks, setTasks] = useState<TaskItemType[]>(taskDataStore.tasks);
  const [current, setCurrent] = useState<Date>(str2Date(taskDataStore.date));

  /**
   * 日付の変更プロセス
   * @param e 
   */
  const changeCurrent = (e: any): void => {
    setCurrent(str2Date(e.target.value));
  };

  useEffect(() => {
    dispatch(setDate(date2Str(current)));
    dispatch(fetchTask(date2Str(current))); // 日付が変わった場合、当該日付のタスクをIndexedDbから取得するように
  }, [current]);

  useEffect(() => {
    setTasks(taskDataStore.tasks);
    setCurrent(str2Date(taskDataStore.date));
  },[taskDataStore]);

  useEffect(() => {
    if (taskDataStore.ranking.length === 0) dispatch(fetchRanking()); // ストアにランキング情報がない場合、IndexedDbから取得するように
  }, []);

  return (
    <main className="tasks">
      <section>
        <div className="date_box">
          <h2>
            <IoMdCalendar />
            {current.toLocaleDateString()}
          </h2>
          <input type="date" defaultValue={date2Str(current)} onChange={(e) => changeCurrent(e)} />
        </div>
      </section>
      <section>
        <ul>
          {tasks.map((item, index) => (
            <ListTaskItem key={index} data={item} link={true} />
          ))}
        </ul>
      </section>
      <div className="float_icon" onClick={() => navigate('/task/new')}>
        <MdAdd />
      </div>
    </main>
  );
};

export default TaskList;
