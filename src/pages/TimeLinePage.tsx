import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectMenuById } from '../features/master';
import { str2LabelDate } from '../features/task/func';
import { selectTimeLineData, fetchTimeLine } from '../features/timeline';
import { ChartItem } from '../components';
import '../css/timeline.scss';

const TimeLinePage: FC = () => {
  const { id } = useParams();
  const menuID = Number(id);
  const dispatch = useAppDispatch();
  const menuName = useAppSelector(selectMenuById(menuID))?.name;
  const timelineDataStore = useAppSelector(selectTimeLineData);
  const [dates, setDates] = useState<string[]>(timelineDataStore.tasks.map((item) => str2LabelDate(item.date)));
  const [weights, setWeights] = useState<number[]>(timelineDataStore.tasks.map((item) => (item.weight ? item.weight : 0)));

  useEffect(() => {
    setDates(timelineDataStore.tasks.map((item) => str2LabelDate(item.date)));
    setWeights(timelineDataStore.tasks.map((item) => (item.weight ? item.weight : 0)));
  }, [timelineDataStore]);

  useEffect(() => {
    dispatch(fetchTimeLine(menuID));
  }, [menuID]);

  return (
    <div className="timeline">
      <section>
        <h2>{menuName}の直近履歴</h2>
        <div className="chart_area">
          <ChartItem date={dates} weight={weights} />
        </div>
      </section>
    </div>
  );
};

export default TimeLinePage;
