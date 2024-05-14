import { FC } from 'react';
import { MasterItemProps } from '../features/master/types';
import { useAppSelector } from '../app/hooks';
import { selectWorkoutTypeById, selectMusclesByIds } from '../features/master';

const ListMasterItem: FC<MasterItemProps> = (props) => {
  const { data, action } = props;

  const type = useAppSelector(selectWorkoutTypeById(data.type));
  const target = useAppSelector(selectMusclesByIds([data.target]));
  const muscles = useAppSelector(selectMusclesByIds(data.muscles));

  return (
    <li className="item" onClick={() => action()}>
      <span className="type">{type?.name}</span>
      <div className="image">
        <img src={data.image} alt={data.name} />
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

export default ListMasterItem;
