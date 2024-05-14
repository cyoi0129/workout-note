import { FC, useState, useEffect } from 'react';
import { ListRankingItem } from '../components';
import { selectTaskData, fetchRanking } from '../features/task';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import '../css/ranking.scss';
import { TaskItemType } from '../features/task/types';

const Ranking: FC = () => {
  const dispatch = useAppDispatch();
  const taskDataStore = useAppSelector(selectTaskData);
  const [ranking, setRanking] = useState<TaskItemType[]>(taskDataStore.ranking);

  useEffect(() => {
    setRanking(taskDataStore.ranking);
  }, [taskDataStore]);

  useEffect(() => {
    if (taskDataStore.ranking.length === 0) dispatch(fetchRanking()); // ストアにランキング情報がない場合、IndexedDbから取得するように
  }, []);

  return (
    <main className="ranking">
      <section>
        <ul>
          {ranking.map((item, index) => (
            <ListRankingItem key={index} data={item} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Ranking;
