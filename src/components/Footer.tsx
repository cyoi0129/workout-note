import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectNoticeData } from '../features/notice';
import { AiFillMessage } from 'react-icons/ai';
import { HiUser, HiSearch } from "react-icons/hi";
import { IoCalendar } from 'react-icons/io5';
import { MdEditNote } from 'react-icons/md';
import '../css/footer.scss';

const Footer: FC = () => {
  const location = useLocation();
  const noticeStore = useAppSelector(selectNoticeData);
  const [current, setCurrent] = useState<string>('');
  const [messageNotice, setMessageNotice] = useState<number>(0);
  const [matchNotice, setMatchNotice] = useState<number>(0);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  useEffect(() => {
    setMessageNotice(noticeStore.messages.length);
    setMatchNotice(noticeStore.matches);
  }, [noticeStore]);

  return (
    <footer>
      <nav>
        <ul>
          <li className={current === '/search' ? 'active' : ''}>
            <Link to="/search">
              <HiSearch />
              <span className="tab_name">検索</span>
            </Link>
          </li>
          <li className={current === '/chat' || current.includes('message') ? 'active' : ''}>
            <Link to="/chat">
              <AiFillMessage />
              <span className="tab_name">メッセージ</span>
            </Link>
            {messageNotice === 0? null : <span className="badge">{messageNotice}</span>}
          </li>
          <li className={current === '/match' ? 'active' : ''}>
            <Link to="/match">
              <HiUser />
              <span className="tab_name">マッチング</span>
            </Link>
            {matchNotice === 0? null : <span className="badge">{matchNotice}</span>}
          </li>
          <li className={current.includes('task') ? 'active' : ''}>
            <Link to="/tasks">
              <MdEditNote />
              <span className="tab_name">タスク</span>
            </Link>
          </li>
          <li className={current === '/' ? 'active' : ''}>
            <Link to="/">
              <IoCalendar />
              <span className="tab_name">履歴</span>
            </Link>
          </li>
          {/* <li className={current === '/user' ? 'active' : ''}>
            <Link to="/user">
              <HiUser />
              <span className="tab_name">ユーザー</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
