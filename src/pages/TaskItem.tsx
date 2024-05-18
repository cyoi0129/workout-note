import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IoMdCalendar } from 'react-icons/io';
import { HiSelector } from 'react-icons/hi';
import { selectMasterById } from '../features/master';
import { MasterSelection } from '../components';
import { date2Str, str2Date } from '../features/task/func';
import { selectTaskById, addTask, updateTask, selectTaskData, updateRanking, setDate, fetchRanking } from '../features/task';
import { MasterItemType } from '../features/master/types';
import { TaskItemType, RankingCheckResult } from '../features/task/types';
import '../css/task.scss';

const TaskItem: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const taskID = String(id);
  const task = useAppSelector(selectTaskById(Number(taskID)));
  const initMasterName = useAppSelector(selectMasterById(task ? task.master : 0));
  const taskDataStore = useAppSelector(selectTaskData);
  const [ranking, setRanking] = useState<TaskItemType[]>(taskDataStore.ranking);
  const [modal, setModal] = useState<boolean>(false);
  const [masterName, setMasterName] = useState<string>(initMasterName ? initMasterName.name : '種目を選択');
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
    setModal(true);
  };

  /**
   * 子コンポーネントから選択されたマスターがあったら、ステート反映
   * @param master 
   */
  const masterSelectAction = (master?: MasterItemType): void => {
    setModal(false);
    if (master?.id) {
      setMaster(master.id);
      setMasterName(master.name);
    }
  };

  /**
   * ランキングの更新必要性をチェック
   * @param task 
   * @returns 
   */
  const checkRanking = (task: TaskItemType): RankingCheckResult => {
    let result: RankingCheckResult = {
      update: false,
    };
    const target = ranking.find((item) => item.master === task.master);
    if (!task.weight) { // 重量のない種目はスキップ
      result.update = false;
    } else if (!target) { // ランキングにない種目は重量比較なしで追加
      result.update = true;
    } else if (target.weight && task.weight > target.weight) {  // 同一種目で重量超過した場合、履歴更新
      result.update = true;
      result.id = target.id;
    } else {  // どちらも当てはまらない場合はスキップ
      result.update = false;
    }
    return result;
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
    const rankingCheckResult = checkRanking(taskData);  // ランキングの更新必要性をチェック
    if (taskID === 'new') { // idない場合はタスクの追加
      dispatch(addTask(taskData));
    } else {  // idある場合はタスクの更新
      taskData.id = Number(taskID);
      dispatch(updateTask(taskData));
    }
    if (rankingCheckResult.update) {  // ランキングの更新が必要の場合
      taskData.id = rankingCheckResult.id;  // タスクのidからランキングのidに上書き（undefindedの場合も）
      dispatch(updateRanking(taskData));
    }
    navigate(-1); // プロセス完了後、一個前の画面へ戻る
  };

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
    setRanking(taskDataStore.ranking);
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
            <div className="selection" onClick={showModal}>
              {masterName}
              <HiSelector />
            </div>
          </dd>
          <dt>
            <label htmlFor="weight">重量</label>
            <input type="text" pattern="\d*" name="weight" value={weight} onChange={(e) => changeWeight(e)} />
            <span>kg</span>
          </dt>
          <dd>
            <input type="range" id="weight" name="weight" min="0" max="300" value={weight} step="5" onChange={(e) => changeWeight(e)} />
          </dd>
          <dt>
            <label htmlFor="set">セット数</label>
            <span>{set}</span>
          </dt>
          <dd>
            <input type="range" id="set" name="set" min="0" max="10" value={set} onChange={(e) => changeSet(e)} />
          </dd>
          <dt>
            <label htmlFor="rep">レップ/時間</label>
            <span>{rep}</span>
          </dt>
          <dd>
            <input type="range" id="rep" name="rep" min="0" max="30" value={rep} onChange={(e) => changeRep(e)} />
          </dd>
          <dt>
            <label htmlFor="size">マシンのサイズ</label>
            <span>{size}</span>
          </dt>
          <dd>
            <input type="range" id="size" name="size" min="0" max="10" value={size} onChange={(e) => changeSize(e)} />
          </dd>
        </dl>
        <div className="button">
          <button onClick={saveTask}>保存</button>
        </div>
      </section>
      {modal ? <MasterSelection action={(master?: MasterItemType) => masterSelectAction(master)} /> : null}
    </main>
  );
};

export default TaskItem;
