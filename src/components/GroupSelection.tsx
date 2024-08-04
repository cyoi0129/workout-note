import { FC, useState, useEffect } from 'react';
import { GroupSelectionProps, LineStationItemType } from '../features/master/types';
import { selectMasterData } from '../features/master';
import { useAppSelector } from '../app/hooks';
import { createLineStationArray } from '../features/master/func';
import '../css/selection.scss';

const GroupSelection: FC<GroupSelectionProps> = (props) => {
  const { selected, action } = props;
  const masterStore = useAppSelector(selectMasterData);
  const [current, setCurrent] = useState<number[]>(selected);
  const [lineStations, setLineStations] = useState<LineStationItemType[]>([]);

  const changeCurrent = (target: number) => {
    if (current.includes(target)) {
      action(current.filter((station) => station !== target));
    } else {
      action([target, ...current]);
    }
  };

  useEffect(() => {
    setLineStations(createLineStationArray(masterStore.lines, masterStore.stations));
  }, [masterStore]);

  useEffect(() => {
    setCurrent(selected);
  }, [selected]);

  return (
    <div className="selection">
      <ul>
        {lineStations.map((line) => (
          <div key={line.id}>
            <h4>{line.name}</h4>
            <ul>
              {line.stations.map((station) => (
                <li key={station.id}>
                  <input type="checkbox" id={'station_' + station.id} name="station" checked={current.includes(station.id)} onChange={() => changeCurrent(station.id)} />
                  <label htmlFor={'station_' + station.id}>{station.name}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GroupSelection;
