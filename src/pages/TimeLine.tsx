import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectMasterById } from '../features/master';
import { selectTimeLineData, fetchTimeLine } from '../features/timeline';
import { ChartItem } from '../components';
import '../css/timeline.scss';

const TimeLine: FC = () => {
  const { id } = useParams();
  const masterID = Number(id);
  const dispatch = useAppDispatch();
  const masterName = useAppSelector(selectMasterById(masterID))?.name;
  const timelineDataStore = useAppSelector(selectTimeLineData);
  const [dates, setDates] = useState<string[]>(timelineDataStore.tasks.map((item) => item.date));
  const [weights, setWeights] = useState<number[]>(timelineDataStore.tasks.map((item) => (item.weight ? item.weight : 0)));

  useEffect(() => {
    setDates(timelineDataStore.tasks.map((item) => item.date));
    setWeights(timelineDataStore.tasks.map((item) => (item.weight ? item.weight : 0)));
  }, [timelineDataStore]);

  useEffect(() => {
    dispatch(fetchTimeLine(masterID));
  }, [masterID]);

  return (
    <main className="timeline">
      <section>
        <h2>{masterName}の直近履歴</h2>
        <div className="chart_area">
          <ChartItem date={dates} weight={weights} />
        </div>
      </section>
    </main>
  );
};

export default TimeLine;
