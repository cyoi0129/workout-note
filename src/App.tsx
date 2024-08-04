import { FC, useEffect } from 'react';
import { Route, Navigate, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Header, Footer, ScrollToTop } from './components';
import { Search, Chat, Message, Match, User, History, TaskItem, TaskList, TimeLine } from './pages';
import { useAppDispatch } from './app/hooks';
import { fetchUserInfo } from './features/user';
import { fetchNoticeData } from './features/notice';
import { fetchMasterData, fetchMasterStorage } from './features/master';
import './css/common.scss';
import Cookies from 'js-cookie';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Cookies.get('user_token')) {
      dispatch(fetchNoticeData());
      dispatch(fetchUserInfo());
      if (!Cookies.get('master')) {
        dispatch(fetchMasterData());
      } else {
        dispatch(fetchMasterStorage());
      }
    } else {
      navigate('/user');
    }
  }, []);

  useEffect(() => {
    dispatch(fetchNoticeData());
  }, [location]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/timeline/:id" element={<TimeLine />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskItem />} />
        <Route path="/match" element={<Match />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
