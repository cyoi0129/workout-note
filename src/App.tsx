import { FC, useEffect, useState } from 'react';
import { Route, Navigate, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Header, Footer, ScrollToTop } from './components';
import { Search, Chat, Message, Match, User, History, TaskItem, TaskList, TimeLine } from './pages';
import { useAppDispatch } from './app/hooks';
import { checkApiHealth } from './app/health';
import { fetchUserInfo } from './features/user';
import { fetchNoticeData } from './features/notice';
import { fetchMasterData, fetchMasterStorage, fetchMasterJson } from './features/master';
import './css/common.scss';
import Cookies from 'js-cookie';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiHealth, setApiHealth] = useState<boolean>(false);
  const [retry, setRetry] = useState<boolean>(false);
  const [useJson, setUseJson] = useState<boolean>(false);

  /**
   * APIサーバーの起動状況チェック
   */
  const doHealthCheck = async (): Promise<void> => {
    const healthResult = await checkApiHealth();
    setApiHealth(healthResult === 'OK');
  };

  useEffect(() => {
    doHealthCheck();
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
    if (!apiHealth) {
      if (!retry) {
        setTimeout(() => {
          doHealthCheck();
          setRetry(true);
        }, 5000);
      } else {
        setApiHealth(true);
        dispatch(fetchMasterJson());
        setUseJson(true);
      }
    }
  });

  useEffect(() => {
    if (useJson) alert('現在サーバー停止中、筋トレ記録のみ利用可能');
  }, [useJson]);

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
      {!apiHealth ? (
        <div className="overlay">
          <div className="loading">
            <p className="message">サーバー再起動 (60s) ...</p>
            <div className="progress">
              <p className="bar"></p>
            </div>
            <span className="loader"></span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default App;
