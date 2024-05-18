import { FC, useState } from 'react';
import { RemoveAlert } from '.';
import { useNavigate } from 'react-router-dom';
import { TaskItemProps } from '../features/task/types';
import { useAppSelector } from '../app/hooks';
import { selectMasterById } from '../features/master';
import { IoMdCalendar, IoMdFitness } from 'react-icons/io';
import { MdCategory, MdOutlineReplay10 } from 'react-icons/md';
import { HiAdjustments } from 'react-icons/hi';
import { useLongPress, LongPressEventType } from 'use-long-press';
import '../css/list_item.scss';

const ListTaskItem: FC<TaskItemProps> = (props) => {
  const { data, link } = props;
  const navigate = useNavigate();
  const master = useAppSelector(selectMasterById(data.master));
  const [alert, setAlert] = useState<boolean>(false);
  /**
   * タスク押下時の動作
   */
  const clickItem = (): void => {
    if (link) navigate(`/task/${data.id}`); // 呼び出すコンポーネントによってクリック時の遷移挙動有無を処理
  };

  /**
   * 長押時の動作
   */
  const longPress = useLongPress(() => setAlert(true), {
    onStart: (event, meta) => () => { },
    onCancel: (event, meta) => {
      setAlert(false);
    },
    filterEvents: (event) => true,
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressEventType.Touch
  });

  return (
    <>
      <li className={link ? 'list_item link' : 'list_item'} onClick={clickItem} {...longPress(master)}>
        <div className="head">
          <h3>{master?.name}</h3>
          {link ? null : (
            <p>
              <IoMdCalendar />
              {data.date}
            </p>
          )}
        </div>
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
          {data.size ? (
            <li>
              <HiAdjustments />
              Size: {data.size}
            </li>
          ) : null}
        </ul>
      </li>
      {alert ? <RemoveAlert id={Number(data.id)} type="task" action={() => setAlert(false)} /> : null}
    </>
  );
};

export default ListTaskItem;
