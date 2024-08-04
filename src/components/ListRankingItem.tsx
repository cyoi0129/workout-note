import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskItemProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMenuById } from '../features/master';
import { IoMdCalendar, IoMdFitness } from 'react-icons/io';
import { MdCategory, MdOutlineReplay10 } from 'react-icons/md';

const ListRankingItem: FC<TaskItemProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const menu = useAppSelector(selectMenuById(data.menu));

  const go2timeline = () => {
    navigate("/timeline/" + data.menu);
  }

  return (
    <>
      <li className="item" onClick={() => go2timeline()}>
        <div className="image">
          <img src={menu?.image} alt={menu?.name} />
        </div>
        <div className="content">
          <h3>{menu?.name}</h3>
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
              {data.rep} Rep
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};

export default ListRankingItem;
