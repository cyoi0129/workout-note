// 現在使用してない
import { FC } from 'react';
import { AlertProps } from '../app/types';
import { IoCloseCircle } from 'react-icons/io5';

const Alert: FC<AlertProps> = (props) => {
  const { id, action } = props;
  console.log(id);
  return (
    <>
      <div className="alert">
        <div className="container">
          <h2>タイトル</h2>
          <p>内容</p>
          <div className="button">
            <button>アクション</button>
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

export default Alert;
