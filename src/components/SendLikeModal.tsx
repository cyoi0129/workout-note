import { FC } from 'react';
import '../css/modal.scss';
import { IoCloseCircle } from 'react-icons/io5';
import { SendLikeModalProps } from '../features/search/types';

const SendLikeModal: FC<SendLikeModalProps> = (props) => {
  const { action } = props;
  const doProcess = (value: string) => {
    action(value);
  };
  return (
    <div className="modal">
      <div className="container">
        <div className="close" onClick={() => doProcess('')}>
          <IoCloseCircle />
        </div>
        <div className="content send_like">
          <h2>いいねを送りますか？</h2>
          <div className="button" onClick={() => doProcess('LIKE')}>
            <button>OK</button>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={() => doProcess('')}></div>
    </div>
  );
};

export default SendLikeModal;
