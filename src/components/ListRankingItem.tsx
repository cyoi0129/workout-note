import { FC } from 'react';
import { TaskItemProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMasterById } from '../features/master';
import { IoMdCalendar, IoMdFitness } from 'react-icons/io';
import { MdCategory, MdOutlineReplay10 } from 'react-icons/md';

const ListRankingItem: FC<TaskItemProps> = (props) => {
  const { data } = props;
  const master = useAppSelector(selectMasterById(data.master));

  return (
    <li className="item">
      <div className="image">
        <img src={master?.image} alt={master?.name} />
      </div>
      <div className="content">
        <h3>{master?.name}</h3>
        <p>
          <IoMdCalendar />
          {data.date}
        </p>
        <ul className="result">
          {data.weight ? (
            <li>
              <IoMdFitness />
              {data.weight} kg
            </li>
          ) : null}
          <li>
            <MdCategory />
            {data.set} Set
          </li>
          <li>
            <MdOutlineReplay10 />
            {data.rep} Rep/Min
          </li>
        </ul>
      </div>
    </li>
  );
};

export default ListRankingItem;
