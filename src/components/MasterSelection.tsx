import { FC, useState, useEffect } from 'react';
import { ListMasterItem } from './';
import { IoCloseCircle } from 'react-icons/io5';
import '../css/master_selection.scss';
import { MasterSelectionProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMasterData } from '../features/master';
import { MasterItemType, MuscleType } from '../features/master/types';

const MasterSelection: FC<MasterSelectionProps> = (props) => {
  const { action } = props;
  const masterDataStore = useAppSelector(selectMasterData);
  const [masters, setMasters] = useState<MasterItemType[]>(masterDataStore.masters);
  const [muscleList, setMuscleList] = useState<MuscleType[]>(masterDataStore.muscles);
  const [type, setType] = useState<number>(0);
  const [part, setPart] = useState<string>("");
  const changeMaster = (target: MasterItemType): void => {
    action(target); // 親コンポーネントに選択されたマスターを伝達
  };

  /**
   * 選択肢のフィルター
   * @param type 
   * @param part 
   */
  const filterProcess = (type: number, part: string): void => {
    let filteredMaster: MasterItemType[] = masterDataStore.masters;
    if (type === 1 || type === 2 || type === 3) {
      filteredMaster = filteredMaster.filter(item => item.type === type);
      setMasters(filteredMaster);
    }
    if (part !== "") {
      filteredMaster = filteredMaster.filter(item => getMuscleGroupById(item.target) === part);
      setMasters(filteredMaster);
    }
    setMasters(filteredMaster);
  }

  /**
   * 筋肉のIDからグループを検索
   * @param id 
   * @returns 
   */
  const getMuscleGroupById = (id: number): string => {
    const target = muscleList.find(muscle => muscle.id === id);
    return target ? target.part : "";
  }

  const changeType = (value: string): void => {
    setType(Number(value));
    filterProcess(Number(value), part);
  }

  const changePart = (value: string): void => {
    setPart(value);
    filterProcess(type, value);
  }

  useEffect(() => {
    setMasters(masterDataStore.masters);
    setMuscleList(masterDataStore.muscles);
  }, [masterDataStore]);
  return (
    <>
      <div className="master_selection">
        <div className="master_filter">
          <select value={type} onChange={(e) => changeType(e.target.value)}>
            <option value={0}>全種類</option>
            <option value={1}>自重</option>
            <option value={2}>フリーウェイト</option>
            <option value={3}>マシン</option>
          </select>
          <select value={part} onChange={(e) => changePart(e.target.value)}>
            <option value="">全部位</option>
            <option value="胸">胸</option>
            <option value="背中">背中</option>
            <option value="肩">肩</option>
            <option value="腕">腕</option>
            <option value="腹">腹</option>
            <option value="足">足</option>
          </select>
        </div>
        <ul>
          {masters.map((item, index) => (
            <ListMasterItem key={index} data={item} action={() => changeMaster(item)} />
          ))}
        </ul>
      </div>
      <div className="close" onClick={action}>
        <IoCloseCircle />
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default MasterSelection;
