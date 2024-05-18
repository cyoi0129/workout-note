import { FC } from 'react';
import { useAppDispatch } from '../app/hooks';
import { removeRanking } from '../features/task';
import { RemoveAlertProps } from '../features/task/types';
import { IoCloseCircle } from 'react-icons/io5';

const RemoveAlert: FC<RemoveAlertProps> = (props) => {
  const { id, action } = props;
  const dispatch = useAppDispatch();
  const removeItem = () => {
    action();
    dispatch(removeRanking(id));
  }
  return (
    <>
      <div className="remove_alert">
        <div className="container">
          <h2>確認</h2>
          <p>削除しますか？</p>
          <div className="button">
            <button onClick={removeItem}>削除</button>
          </div>
        </div>
      </div>
      <div className="close" onClick={action}>
        <IoCloseCircle />
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default RemoveAlert;
