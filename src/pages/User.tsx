import { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUserData, userLogin } from '../features/user';
import '../css/user.scss';

const User: FC = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(selectUserData);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * ログインプロセス（ログイン成功後はリロード）
   */
  const login = (): void => {
    dispatch(userLogin({ email: email, password: password }));
  };

  useEffect(() => {
    if (userStore.login) window.location.href = '/';
    if (userStore.error) {
      alert('Login Error');
    }
  }, [userStore]);
  
  return (
    <main className="user">
      <section>
        <h2>ログイン</h2>
        <dl>
          <dt>メールアドレス</dt>
          <dd>
            <input name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </dd>
          <dt>パスワード</dt>
          <dd>
            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </dd>
        </dl>
        <div className="button">
          <button onClick={login}>ログイン</button>
        </div>
      </section>
    </main>
  );
};

export default User;
