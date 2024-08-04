import { FC, useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSearchData, fetchSearchData } from '../features/search';
import { fetchExistMatch, selectMatchData, sendMatchRequest } from '../features/match';
import { UserDataType } from '../features/user/types';
import { ItemSelection, GroupSelection, SearchResultItem, SendLikeModal } from '../components';
import '../css/search.scss';
import { DbSendMatchItemType } from '../features/match/types';
import Cookies from 'js-cookie';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const SearchPage: FC = () => {
  const dispatch = useAppDispatch();
  const searchStore = useAppSelector(selectSearchData);
  const matchStore = useAppSelector(selectMatchData);
  const resultRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [gyms, setGyms] = useState<number[]>([]);
  const [areas, setAreas] = useState<number[]>([]);
  const [stations, setStations] = useState<number[]>([]);
  const [results, setResults] = useState<UserDataType[]>([]);
  const [currentItem, setCurrentItem] = useState<UserDataType | null>(null);
  const [exists, setExists] = useState<number[]>([]);

  const changeArea = (selected: number[]) => {
    setAreas(selected);
  };

  const changeGym = (selected: number[]) => {
    setGyms(selected);
  };

  const changeStation = (selected: number[]) => {
    setStations(selected);
  };

  const doSearch = () => {
    dispatch(fetchSearchData({ Gyms: gyms, Areas: areas, Stations: stations }));
    setShowMenu(false);
    if (resultRef.current) resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const itemClick = (target: UserDataType) => {
    if (exists.includes(target.id)) return;
    setModal(true);
    setCurrentItem(target);
  };

  const modalProcess = (value: string) => {
    if (currentItem === null || exists.includes(currentItem.id)) return;
    const match_target: DbSendMatchItemType = {
      Requester: Number(Cookies.get('user_id')),
      Approver: currentItem.id,
      Status: 'REQUEST',
    };
    if (value === 'LIKE') {
      dispatch(sendMatchRequest(match_target));
    }
    setModal(false);
  };

  useEffect(() => {
    setResults(searchStore.data);
  }, [searchStore]);

  useEffect(() => {
    setExists(matchStore.exists);
  }, [matchStore]);

  useEffect(() => {
    dispatch(fetchExistMatch());
  }, []);

  return (
    <main className="search">
      <section>
        <h2>マッチョ検索{showMenu ? null : <div className="arrow_btn" onClick={() => setShowMenu(true)}><IoIosArrowDropdownCircle /></div>}</h2>
        {showMenu ? (
          <div className="filter">
            <dl>
              <dt>ジム</dt>
              <dd>
                <ItemSelection type="gym" selected={gyms} action={changeGym} />
              </dd>
              <dt>エリア</dt>
              <dd>
                <ItemSelection type="area" selected={areas} action={changeArea} />
              </dd>
              <dt>駅</dt>
              <dd>
                <GroupSelection selected={stations} action={changeStation} />
              </dd>
            </dl>
            <div className="button">
              <button onClick={doSearch}>検索</button>
            </div>
          </div>
        ) : null}
        <div className="results" ref={resultRef}>
          <ul>
            {results.map((item) => (
              <li key={item.id} onClick={() => itemClick(item)} className={exists.includes(item.id) ? 'hidden' : ''}>
                <SearchResultItem data={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {modal ? <SendLikeModal action={modalProcess} /> : null}
    </main>
  );
};

export default SearchPage;
