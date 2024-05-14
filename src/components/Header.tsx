import { FC } from 'react';
import '../css/header.scss';

const Header: FC = () => {
  return (
    <header>
      <img src="/icons/fitness_handwrite.png" alt="ロゴ" />
      <h1>まっちょノート</h1>
    </header>
  );
};

export default Header;
