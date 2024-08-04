import { FC, useState, useEffect } from 'react';
import { ListMenuItem } from './';
import { IoCloseCircle } from 'react-icons/io5';
import '../css/menu_selection.scss';
import { MenuSelectionProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMasterData } from '../features/master';
import { MenuItemType, MuscleItemType } from '../features/master/types';

const MenuSelection: FC<MenuSelectionProps> = (props) => {
  const { action } = props;
  const masterDataStore = useAppSelector(selectMasterData);
  const [menus, setMenus] = useState<MenuItemType[]>(masterDataStore.menus);
  const [muscleList, setMuscleList] = useState<MuscleItemType[]>(masterDataStore.muscles);
  const [type, setType] = useState<string>('');
  const [part, setPart] = useState<string>('');
  const changeMenu = (target: MenuItemType): void => {
    action(target); // 親コンポーネントに選択されたマスターを伝達
  };

  /**
   * 選択肢のフィルター
   * @param type
   * @param part
   */
  const filterProcess = (type: string, part: string): void => {
    let filteredMenu: MenuItemType[] = masterDataStore.menus;
    if (type !== '') {
      filteredMenu = filteredMenu.filter((item) => item.type === type);
      setMenus(filteredMenu);
    }
    if (part !== '') {
      filteredMenu = filteredMenu.filter((item) => getMuscleGroupById(item.target) === part);
      setMenus(filteredMenu);
    }
    setMenus(filteredMenu);
  };

  /**
   * 筋肉のIDからグループを検索
   * @param id
   * @returns
   */
  const getMuscleGroupById = (id: number): string => {
    const target = muscleList.find((muscle) => muscle.id === id);
    return target ? target.part : '';
  };

  const changeType = (value: string): void => {
    setType(value);
    filterProcess(value, part);
  };

  const changePart = (value: string): void => {
    setPart(value);
    filterProcess(type, value);
  };

  useEffect(() => {
    setMenus(masterDataStore.menus);
    setMuscleList(masterDataStore.muscles);
  }, [masterDataStore]);
  return (
    <>
      <div className="menu_selection">
        <div className="menu_filter">
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
          {menus.map((item, index) => (
            <ListMenuItem key={index} data={item} action={() => changeMenu(item)} />
          ))}
        </ul>
      </div>
      <div className="close" onClick={() => action(null)}>
        <IoCloseCircle />
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default MenuSelection;
