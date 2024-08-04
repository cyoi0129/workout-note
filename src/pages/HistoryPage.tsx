import { FC, useState } from 'react';
import { History, Ranking } from '../components';
import "../css/home.scss";

const HistoryPage: FC = () => {
  const [current, setCurrent] = useState<'history' | 'ranking'>('history');

  return (
    <main className="home">
      <ul className="tab">
        <li className={current === 'ranking' ? '' : 'active'} onClick={() => setCurrent('history')}>
          履歴
        </li>
        <li className={current === 'history' ? '' : 'active'} onClick={() => setCurrent('ranking')}>
          ランキング
        </li>
      </ul>
      {current === 'ranking' ? <Ranking /> : <History />}
    </main>
  );
};

export default HistoryPage;
