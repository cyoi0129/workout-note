import { FC } from 'react';
import { MatchResultItemProps } from '../features/match/types';
import { FaFemale, FaMale } from 'react-icons/fa';
import '../css/person.scss';

const SearchResultItem: FC<MatchResultItemProps> = (props) => {
  const { data } = props;
  return (
    <div className="person">
      {data.gender === '女' ? <FaFemale /> : <FaMale />}
      <div className="content">
        <h4>{data.name}<span>{new Date().getFullYear() - data.brith}</span></h4>
        <dl>
          <dt>BP</dt>
          <dd>{data.bp}</dd>
          <dt>SQ</dt>
          <dd>{data.sq}</dd>
          <dt>DL</dt>
          <dd>{data.dl}</dd>
        </dl>
      </div>
    </div>
  );
};

export default SearchResultItem;
