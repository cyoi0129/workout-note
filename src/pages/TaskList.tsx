import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTaskItem } from '../components';
import { selectTaskData, fetchTask, setDate, fetchRanking, copyTasks } from '../features/task';
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
  const [copyDate, setCopyDate] = useState<Date | null>(null);

  /**
   * 日付の変更プロセス
   * @param e 
   */
  const changeCurrent = (e: any): void => {
    setCurrent(str2Date(e.target.value));
    setCopyDate(null);
  };

  /**
   * コピー先の日付
   * @param e 
   */
  const changeCopy = (e: any): void => {
    setCopyDate(str2Date(e.target.value));
  };

  /**
   * DBの複製メソッド呼び出す
   */
  const copyFromHistory = (): void => {
    if (!copyDate) return;
    dispatch(copyTasks({ target: date2Str(copyDate), current: date2Str(current) }))
  }

  useEffect(() => {
    dispatch(setDate(date2Str(current)));
    dispatch(fetchTask(date2Str(current))); // 日付が変わった場合、当該日付のタスクをIndexedDbから取得するように
  }, [current]);

  useEffect(() => {
    setTasks(taskDataStore.tasks);
    setCurrent(str2Date(taskDataStore.date));
  }, [taskDataStore]);

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
        {tasks.length === 0 ? <div className="history_copy">
          {copyDate ?
            <div className="select_area">
              <div className="date_area">
                <p className="selected_date">{copyDate.toLocaleDateString()}</p>
                <input className="date_input" type="date" defaultValue={date2Str(copyDate)} onChange={(e) => changeCopy(e)} />
              </div>
              <button onClick={copyFromHistory}>この日からコピー</button>
            </div>
            :
            <div className="copy_area">
              <p className="select_copy">履歴からコピー</p>
              <input className="copy_date" type="date" onChange={(e) => changeCopy(e)} />
            </div>}
        </div> : null}
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
