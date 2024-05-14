import { FC, useState, useEffect } from 'react';
import { ListMasterItem } from './';
import { IoCloseCircle } from 'react-icons/io5';
import '../css/master_selection.scss';
import { MasterSelectionProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMasterData } from '../features/master';
import { MasterItemType } from '../features/master/types';

const MasterSelection: FC<MasterSelectionProps> = (props) => {
  const { action } = props;
  const masterDataStore = useAppSelector(selectMasterData);
  const [masters, setMasters] = useState<MasterItemType[]>(masterDataStore.masters);
  const changeMaster = (target: MasterItemType): void => {
    action(target); // 親コンポーネントに選択されたマスターを伝達
  };

  useEffect(() => {
    setMasters(masterDataStore.masters);
  }, [masterDataStore]);

  return (
    <>
      <div className="master_selection">
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
