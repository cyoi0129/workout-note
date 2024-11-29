import { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUserData, userLogin, userRegister } from '../features/user';
import { fetchMasterData } from '../features/master';
import '../css/login.scss';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(selectUserData);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * ログインプロセス（ログイン成功後はリロード）
   */
  const doProcess = (): void => {
    if (isNew) {
      dispatch(userRegister({ email: email, password: password }));
    } else {
      dispatch(userLogin({ email: email, password: password }));
    }
  };

  useEffect(() => {
    if (userStore.error) {
      alert('Login Error');
    } else if (userStore.login) {
      dispatch(fetchMasterData());
    }
  }, [userStore]);

  return (
    <div className="login">
      <section>
        <ul className="tab">
          <li className={isNew ? '' : 'active'} onClick={() => setIsNew(false)}>
            ログイン
          </li>
          <li className={isNew ? 'active' : ''} onClick={() => setIsNew(true)}>
            登録
          </li>
        </ul>
        {isNew ? (
          <div className="form">
            <p className="stopping">
              テスト用のサイトです
              <br />
              新規登録停止中
            </p>
          </div>
        ) : (
          <div className="form">
            <dl>
              <dt>メールアドレス</dt>
              <dd>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                <div className="hint">user1@test.com</div>
              </dd>
              <dt>パスワード</dt>
              <dd>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                <div className="hint">test</div>
              </dd>
            </dl>
            <div className="button">
              <button onClick={doProcess}>{isNew ? '登録' : 'ログイン'}</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Login;
