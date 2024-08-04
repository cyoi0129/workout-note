import { FC, useState } from 'react';
import '../css/modal.scss';
import { IoCloseCircle } from 'react-icons/io5';
import { UpdateMatchModalProps } from '../features/match/types';

const UpdateMatchModal: FC<UpdateMatchModalProps> = (props) => {
  const { action } = props;
  const [result, setResult] = useState<string>('');
  const doProcess = (value: string) => {
    action(value);
  };

  return (
    <div className="modal">
      <div className="container">
        <div className="close" onClick={() => doProcess('')}>
          <IoCloseCircle />
        </div>
        <div className="content update_match">
          <h2>マッチングしますか？</h2>
          <div className="selection">
            <p>
              <input id="male" type="radio" name="result" value="APPROVAL" onChange={(e) => setResult(e.target.value)} checked={result === 'APPROVAL'} />
              <label htmlFor="male">承諾</label>
              <input id="female" type="radio" name="result" value="REJECT" onChange={(e) => setResult(e.target.value)} checked={result === 'REJECT'} />
              <label htmlFor="female">拒否</label>
            </p>
          </div>
          <div className="button" onClick={() => doProcess(result)}>
            <button>OK</button>
          </div>
        </div>
      </div>

      <div className="overlay" onClick={() => doProcess('')}></div>
    </div>
  );
};

export default UpdateMatchModal;
