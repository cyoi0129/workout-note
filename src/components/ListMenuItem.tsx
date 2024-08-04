import { FC } from 'react';
import { MenuItemProps } from '../features/master/types';
import { useAppSelector } from '../app/hooks';
import { selectMusclesByIds } from '../features/master';

const ListMenuItem: FC<MenuItemProps> = (props) => {
  const { data, action } = props;
  const target = useAppSelector(selectMusclesByIds([data.target]));
  const muscles = useAppSelector(selectMusclesByIds(data.muscles));

  return (
    <li className="item" onClick={() => action()}>
      <span className="type">{data.type}</span>
      <div className="image">
        <img src={data.image === '' ? '/images/body_weight.png' : data.image} alt={data.name} />
      </div>
      <div className="content">
        <h3>{data.name}</h3>
        <span>{target[0]?.name}</span>
        <ul className="muscle">
          {muscles.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ListMenuItem;
