import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoveAlert } from '.';
import { TaskItemProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMasterById } from '../features/master';
import { IoMdCalendar, IoMdFitness } from 'react-icons/io';
import { MdCategory, MdOutlineReplay10 } from 'react-icons/md';
import { useLongPress, LongPressEventType } from 'use-long-press';

const ListRankingItem: FC<TaskItemProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const master = useAppSelector(selectMasterById(data.master));
  const [alert, setAlert] = useState<boolean>(false);

  const go2timeline = () => {
    navigate("/timeline/" + data.master);
  }

  const longPress = useLongPress(() => setAlert(true), {
    onStart: (event, meta) => {console.log(event, meta)},
    onCancel: (event, meta) => {
      console.log(event, meta);
      setAlert(false);
    },
    filterEvents: () => true,
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressEventType.Touch,
  });

  return (
    <>
      <li className="item" onClick={() => go2timeline()} {...longPress()}>
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
              {data.rep} Rep
            </li>
          </ul>
        </div>
      </li>
      {alert ? <RemoveAlert id={Number(data.id)} action={() => setAlert(false)} /> : null}
    </>
  );
};

export default ListRankingItem;
