import { FC, useEffect } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { setUserLogin } from './features/user';
import { fetchData, fetchStorage } from './features/master';
import { HistoryPage, MasterPage, TaskListPage, TaskItemPage, RankingPage, UserPage, TimeLinePage } from './pages';
import { ScrollToTop, Header, Footer } from './components';
import './css/common.scss';
import Cookies from 'js-cookie';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('user')) {
      dispatch(setUserLogin());
      if (!Cookies.get('master')) {
        dispatch(fetchData());
      } else {
        dispatch(fetchStorage());
      }
    } else {
      navigate("/user");
    }
  }, []);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HistoryPage />} />
        <Route path="/master" element={<MasterPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/task/:id" element={<TaskItemPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/timeline/:id" element={<TimeLinePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
