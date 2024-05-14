import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoCalendar } from 'react-icons/io5';
import { FaAward } from 'react-icons/fa6';
import { IoIosFitness } from 'react-icons/io';
import { MdEditNote } from 'react-icons/md';
import '../css/footer.scss';

const Footer: FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState<string>('');

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <footer>
      <nav>
        <ul>
          <li className={current === '/' ? 'active' : ''}>
            <Link to="/">
              <IoCalendar />
              <span>履歴</span>
            </Link>
          </li>
          <li className={current === '/ranking' ? 'active' : ''}>
            <Link to="/ranking">
              <FaAward />
              <span>記録</span>
            </Link>
          </li>
          <li className={current.includes('task') ? 'active' : ''}>
            <Link to="/tasks">
              <MdEditNote />
              <span>ノート</span>
            </Link>
          </li>
          <li className={current === '/master' ? 'active' : ''}>
            <Link to="/master">
              <IoIosFitness />
              <span>種目</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
