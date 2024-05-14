import { FC, useState, useEffect } from 'react';
import { ListMasterItem } from '../components';
import { useAppSelector } from '../app/hooks';
import { selectMasterData } from '../features/master';
import { MasterItemType } from '../features/master/types';
import '../css/master.scss';

const Master: FC = () => {
  const masterDataStore = useAppSelector(selectMasterData);
  const [masters, setMasters] = useState<MasterItemType[]>(masterDataStore.masters);

  useEffect(() => {
    setMasters(masterDataStore.masters);
  }, [masterDataStore]);

  return (
    <main className="master">
      <section>
        <ul>
          {masters.map((item) => (
            <ListMasterItem key={item.id} data={item} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Master;
