import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectChatData, fetchChatData } from '../features/chat';
import { selectNoticeData } from '../features/notice';
import { ChatItemType } from '../features/chat/types';
import { Link } from 'react-router-dom';
import { IoTime, IoPerson } from 'react-icons/io5';
import '../css/chat.scss';

const ChatPage: FC = () => {
  const dispatch = useAppDispatch();
  const chatStore = useAppSelector(selectChatData);
  const noticeStore = useAppSelector(selectNoticeData);
  const [notices, setNotices] = useState<number[]>([]);
  const [chatList, setChatList] = useState<ChatItemType[]>([]);

  useEffect(() => {
    dispatch(fetchChatData());
    setNotices(noticeStore.messages);
  }, []);

  useEffect(() => {
    setChatList(chatStore.chats);
  }, [chatStore]);

  return (
    <main className="chat">
      <section>
        <ul>
          {chatList.map((chat) => (
            <li key={chat.id}>
              <Link to={'/message/' + chat.id}>
                <h3>
                  <IoPerson />
                  {chat.targetName}
                </h3>
                <p className="time">
                  <IoTime />
                  {chat.date ? chat.date.replace('T', ' ').replace('Z', '') : '-'}
                </p>
                <p className="message">{chat.message ? chat.message : <span>マッチングしました</span>}</p>
              </Link>
              {notices.includes(chat.id) ? <span className="notice">New</span> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ChatPage;
