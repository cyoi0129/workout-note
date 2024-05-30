import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IoMdCalendar } from 'react-icons/io';
import { HiSelector } from 'react-icons/hi';
import { selectMasterById } from '../features/master';
import { MasterSelection } from '../components';
import { date2Str, str2Date } from '../features/task/func';
import { selectTaskById, addTask, updateTask, selectTaskData, updateRanking, setDate, fetchRanking, removeTask } from '../features/task';
import { MasterItemType } from '../features/master/types';
import { TaskItemType } from '../features/task/types';
import '../css/task.scss';

const TaskItem: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const taskID = String(id);
  const task = useAppSelector(selectTaskById(Number(taskID)));
  const initMasterName = useAppSelector(selectMasterById(task ? task.master : 0));
  const taskDataStore = useAppSelector(selectTaskData);
  const [modal, setModal] = useState<boolean>(false);
  const [masterName, setMasterName] = useState<string>(initMasterName ? initMasterName.name : '種目を選択');
  const [workoutType, setWorkoutType] = useState<number>(initMasterName ? initMasterName.type : 0);
  const [master, setMaster] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [set, setSet] = useState<number>(0);
  const [rep, setRep] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [current, setCurrent] = useState<Date>(str2Date(taskDataStore.date));

  const changeDate = (e: any): void => {
    dispatch(setDate(e.target.value));
    setCurrent(str2Date(e.target.value));
  };
  const changeWeight = (e: any): void => {
    let result = e.target.value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: any) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    result = result.replace(/[^0-9]/g, "");
    setWeight(Number(result));
  };
  const changeSet = (e: any): void => {
    setSet(Number(e.target.value));
  };
  const changeRep = (e: any): void => {
    setRep(Number(e.target.value));
  };
  const changeSize = (e: any): void => {
    setSize(Number(e.target.value));
  };
  const showModal = (): void => {
    if (initMasterName) return;
    setModal(true);
  };

  /**
   * 子コンポーネントから選択されたマスターがあったら、ステート反映
   * @param master 
   */
  const masterSelectAction = (master?: MasterItemType): void => {
    if (initMasterName) return;
    setModal(false);
    if (master?.id) {
      setMaster(master.id);
      setMasterName(master.name);
      setWorkoutType(master.type);
    }
  };

  /**
   * タスクの保存
   */
  const saveTask = (): void => {
    const taskData: TaskItemType = {
      master: master,
      date: date2Str(current),
      set: set,
      rep: rep,
      weight: weight,
      size: size,
    };
    if (taskID === 'new') { // idない場合はタスクの追加
      dispatch(addTask(taskData));
    } else {  // idある場合はタスクの更新
      taskData.id = Number(taskID);
      dispatch(updateTask(taskData));
    }
    if (taskData.weight) dispatch(updateRanking(taskData.master));
    navigate(-1); // プロセス完了後、一個前の画面へ戻る
  };

  /**
   * タスクの削除
   */
  const deleteTask = (): void => {
    dispatch(removeTask(Number(taskID)));
    if(weight) dispatch(updateRanking(master));
    navigate(-1); // プロセス完了後、一個前の画面へ戻る
  }

  useEffect(() => {
    if (!task) return;
    if (taskDataStore.ranking.length === 0) dispatch(fetchRanking()); // ストアにランキング情報がない場合、IndexedDbから取得するように
    setMaster(task.master);
    setSet(task.set);
    setRep(task.rep);
    setCurrent(str2Date(task.date));
    if (task.weight) setWeight(task.weight);
    if (task.size) setSize(task.size);
  }, [task]);

  useEffect(() => {
    setCurrent(str2Date(taskDataStore.date));
  }, [taskDataStore]);

  return (
    <main className="task">
      <section>
        <div className="date_box">
          <h2>
            <IoMdCalendar />
            {current.toLocaleDateString()}
          </h2>
          <input type="date" defaultValue={date2Str(current)} onChange={(e) => changeDate(e)} />
        </div>
        <dl>
          <dt>種目</dt>
          <dd>
            <div className={initMasterName? "selection disable" : "selection"} onClick={showModal}>
              {masterName}
              <HiSelector />
            </div>
          </dd>
          {(workoutType === 2 || workoutType === 3) ?
            <>
              <dt>
                <label htmlFor="weight">重量</label>
                <input type="text" pattern="\d*" name="weight" value={weight} onChange={(e) => changeWeight(e)} />
                <span>kg</span>
              </dt>
              <dd>
                <input type="range" id="weight" name="weight" min="0" max="300" value={weight} step="5" onChange={(e) => changeWeight(e)} />
              </dd>
            </> : null
          }
          <dt>
            <label htmlFor="set">セット数</label>
            <span>{set}</span>
          </dt>
          <dd>
            <input type="range" id="set" name="set" min="0" max="10" value={set} onChange={(e) => changeSet(e)} />
          </dd>
          <dt>
            <label htmlFor="rep">レップ</label>
            <span>{rep}</span>
          </dt>
          <dd>
            <input type="range" id="rep" name="rep" min="0" max="15" value={rep} onChange={(e) => changeRep(e)} />
          </dd>
          {workoutType === 3 ? <>
            <dt>
              <label htmlFor="size">マシンのサイズ</label>
              <span>{size}</span>
            </dt>
            <dd>
              <input type="range" id="size" name="size" min="0" max="10" value={size} onChange={(e) => changeSize(e)} />
            </dd>
          </> : null}
        </dl>
        <div className="button">
          {taskID === 'new' ? null : <button className="remove" onClick={deleteTask}>削除</button>}
          <button onClick={saveTask}>保存</button>
        </div>
      </section>
      {modal ? <MasterSelection action={(master?: MasterItemType) => masterSelectAction(master)} /> : null}
    </main>
  );
};

export default TaskItem;
