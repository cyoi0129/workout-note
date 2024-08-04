import { FC, useState, useEffect } from 'react';
import { GeneralItemType } from '../app/types';
import { ItemSelectionProps } from '../features/master/types';
import { selectMasterData } from '../features/master';
import { useAppSelector } from '../app/hooks';
import '../css/selection.scss';

const Selection: FC<ItemSelectionProps> = (props) => {
  const { type, selected, action } = props;
  const masterStore = useAppSelector(selectMasterData);
  const [current, setCurrent] = useState<number[]>(selected);
  const [items, setItems] = useState<GeneralItemType[]>([]);

  const changeCurrent = (target: number) => {
    if (current.includes(target)) {
      action(current.filter((item) => item !== target));
    } else {
      action([target, ...current]);
    }
  };

  useEffect(() => {
    if (type === 'area') {
      setItems(masterStore.areas);
    } else {
      setItems(masterStore.gyms);
    }
  }, [masterStore, type]);

  useEffect(() => {
    setCurrent(selected);
  }, [selected]);

  return (
    <div className="selection">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" id={type + '_' + item.id} name={type} checked={current.includes(item.id)} onChange={() => changeCurrent(item.id)} />
            <label htmlFor={type + '_' + item.id}>{item.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selection;
