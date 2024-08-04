import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserData, updateUserInfo } from '../features/user';
import { UserDataType } from '../features/user/types';
import { times_array } from '../app/util';
import { ItemSelection, GroupSelection } from './';
import '../css/user.scss';

const User: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(selectUserData);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birth, setBirth] = useState<number>(0);
  const [areas, setAreas] = useState<number[]>([]);
  const [stations, setStations] = useState<number[]>([]);
  const [gyms, setGyms] = useState<number[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [bp, setBp] = useState<number>(0);
  const [sq, setSq] = useState<number>(0);
  const [dl, setDl] = useState<number>(0);

  const yearRange = (): number[] => {
    const years: number[] = [];
    const current_year: number = Number(new Date().getFullYear());
    for (let i: number = 1960; i < current_year - 15; i++) {
      years.push(i);
    }
    return years;
  };

  const changeTimes = (target: string) => {
    if (times.includes(target)) {
      setTimes(times.filter((item) => item !== target));
    } else {
      setTimes([target, ...times]);
    }
  };

  const changeArea = (selected: number[]) => {
    setAreas(selected);
  };

  const changeGym = (selected: number[]) => {
    setGyms(selected);
  };

  const changeStation = (selected: number[]) => {
    setStations(selected);
  };

  const save = (): void => {
    const userData: UserDataType = {
      id: userStore.data.id,
      name: name,
      gender: gender,
      brith: birth,
      areas: areas,
      stations: stations,
      gyms: gyms,
      times: times,
      bp: bp,
      sq: sq,
      dl: dl
    }
    dispatch(updateUserInfo(userData));
  };

  useEffect(() => {
    if (userStore.error) {
      alert('DB Error');
    } else {
      setName(userStore.data.name);
      setGender(userStore.data.gender);
      setBirth(userStore.data.brith);
      setAreas(userStore.data.areas);
      setStations(userStore.data.stations);
      setGyms(userStore.data.gyms);
      setTimes(userStore.data.times);
      setBp(userStore.data.bp);
      setSq(userStore.data.sq);
      setDl(userStore.data.dl);
    }
  }, [userStore, navigate]);

  return (
    <div className="user">
      <section>
        <h2>ユーザー情報</h2>
        <dl>
          <dt>ニックネーム</dt>
          <dd>
            <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
          </dd>
          <dt>性別</dt>
          <dd>
            <input id="male" type="radio" name="gender" value="男" onChange={(e) => setGender(e.target.value)} checked={gender === '男'} />
            <label htmlFor="male">男</label>
            <input id="female" type="radio" name="gender" value="女" onChange={(e) => setGender(e.target.value)} checked={gender === '女'} />
            <label htmlFor="female">女</label>
          </dd>
          <dt>誕生年</dt>
          <dd>
            <select value={birth} onChange={(e) => setBirth(Number(e.target.value))}>
              {yearRange().map((i) => (
                <option key={i} value={i}>
                  {i} 年
                </option>
              ))}
            </select>
          </dd>
          <dt>エリア</dt>
          <dd>
            <ItemSelection type="area" selected={areas} action={changeArea} />
          </dd>
          <dt>駅</dt>
          <dd>
            <GroupSelection selected={stations} action={changeStation} />
          </dd>
          <dt>ジム</dt>
          <dd>
            <ItemSelection type="gym" selected={gyms} action={changeGym} />
          </dd>
          <dt>時間帯</dt>
          <dd>
            <div className="selection_area">
              <ul>
                {times_array.map((value, index) => (
                  <li key={index}>
                    <input type="checkbox" id={'times_' + index} name="times" checked={times.includes(value)} onChange={() => changeTimes(value)} />
                    <label htmlFor={'times_' + index}>{value}</label>
                  </li>
                ))}
              </ul>
            </div>
          </dd>
          <dt>
            ベンチプレス<span>{bp} kg</span>
          </dt>
          <dd>
            <input type="range" name="bp" min="0" max="300" step="10" value={bp} onChange={(e) => setBp(Number(e.target.value))} />
          </dd>
          <dt>
            スクワット<span>{sq} kg</span>
          </dt>
          <dd>
            <input type="range" name="sq" min="0" max="300" step="10" value={sq} onChange={(e) => setSq(Number(e.target.value))} />
          </dd>
          <dt>
            デッドリフト<span>{dl} kg</span>
          </dt>
          <dd>
            <input type="range" name="dl" min="0" max="300" step="10" value={dl} onChange={(e) => setDl(Number(e.target.value))} />
          </dd>
        </dl>
        <div className="button">
          <button onClick={save}>保存</button>
        </div>
      </section>
    </div>
  );
};

export default User;
