import { FC } from 'react';
import { useAppDispatch } from '../app/hooks';
import { removeStorageTask, removeStorageRanking } from '../features/task/db';
import { RemoveAlertProps } from '../features/task/types';
import { IoCloseCircle } from 'react-icons/io5';

const RemoveAlert: FC<RemoveAlertProps> = (props) => {
  const { id, type, action } = props;
  const dispatch = useAppDispatch();
  console.log(id, type);
  return (
    <>
      <div className="remove_alert">
        <h2>削除しますか？</h2>
      </div>
      <div className="close" onClick={action}>
        <IoCloseCircle />
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default RemoveAlert;
