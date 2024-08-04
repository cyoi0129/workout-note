import { FC, useState, useEffect } from 'react';
import { Login, User } from '../components';
import { useAppSelector } from '../app/hooks';
import { selectUserData } from '../features/user';

const UserPage: FC = () => {
  const userStore = useAppSelector(selectUserData);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  useEffect(() => {
    if (userStore.error) {
      alert('DB Error');
    } else {
      setIsLogined(userStore.login);
    }
  }, [userStore]);

  return <main className="user">{isLogined ? <User /> : <Login />}</main>;
};

export default UserPage;
