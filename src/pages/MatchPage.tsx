import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectMatchData, fetchMatchListData, replyMatchRequest } from '../features/match';
import { selectNoticeData, removeMatchNoticeData } from '../features/notice';
import { MatchItemDataType, DbMatchItemType } from '../features/match/types';
import { MatchResultItem, UpdateMatchModal } from '../components';

const MatchPage: FC = () => {
  const dispatch = useAppDispatch();
  const matchStore = useAppSelector(selectMatchData);
  const noticeStore = useAppSelector(selectNoticeData);
  const [modal, setModal] = useState<boolean>(false);
  const [matchList, setMatchList] = useState<MatchItemDataType[]>([]);
  const [currentMatch, setCurrentMatch] = useState<MatchItemDataType | null>(null);

  const clickItem = (target: MatchItemDataType) => {
    setModal(true);
    setCurrentMatch(target);
  };

  const modalProcess = (result: string) => {
    if (currentMatch === null) return;
    const update_match: DbMatchItemType = {
      Id: currentMatch.id,
      Approver: currentMatch.approver,
      Requester: currentMatch.requester,
      Status: result
    }
    if (result === 'APPROVAL' || result === 'REJECT') {
      dispatch(replyMatchRequest(update_match))
    }
    setModal(false);
  };

  useEffect(() => {
    setMatchList(matchStore.matches);
  }, [matchStore]);

  useEffect(() => {
    dispatch(fetchMatchListData());
    if (noticeStore.matches > 0) dispatch(removeMatchNoticeData());
  }, []);
  return (
    <main className="match">
      <section>
        <ul>
          {matchList.map((match) => (
            <li onClick={() => clickItem(match)} key={match.id}>
              <MatchResultItem data={match} />
            </li>
          ))}
        </ul>
      </section>
      {modal ? <UpdateMatchModal action={modalProcess} /> : null}
    </main>
  );
};

export default MatchPage;
