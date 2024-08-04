import { FC } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss';
import { FaUserCircle } from "react-icons/fa";

const Header: FC = () => {
  return (
    <header>
      <h1>
        <img src="/logo512.png" alt="まっちょの森" />
        まっちょの森
      </h1>
      <div className="hd_user">
        <Link to="/user">
          <FaUserCircle />
        </Link>
      </div>
    </header>
  );
};

export default Header;
