import { FC, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectChatData, fetchMessageData, sendMessageData, fetchChatData } from '../features/chat';
import { selectNoticeData, removeMessageNoticeData } from '../features/notice';
import { DbSendMessageItemType, MessageItemType } from '../features/chat/types';
import { createMarkup } from '../features/chat/func';
// import { ws_base } from '../app/util';
import Cookies from 'js-cookie';
import '../css/message.scss';
import { IoIosSend } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';

const MessagePage: FC = () => {
  const { id } = useParams();
  const chatID = String(id);
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const chatStore = useAppSelector(selectChatData);
  const noticeStore = useAppSelector(selectNoticeData);
  const [target, setTarget] = useState<number>(0);
  const [displayName, setDisplayName] = useState<string>('');
  const [messageList, setMessageList] = useState<MessageItemType[]>([]);
  const [message, setMessage] = useState<string>('');
  const user_id: number = Number(Cookies.get('user_id'));

  // const uri = ws_base + chatID + '?' + new URLSearchParams({ user: String(user_id) });
  // const ws = new WebSocket(uri);

  // ws.onopen = () => {
  //   console.log('Connected');
  // };

  // ws.onmessage = (e) => {
  //   const message_data = JSON.parse(e.data);
  //   if (Number(message_data.id) !== user_id) {
  //     const new_message: MessageItemType = {
  //       id: 0,
  //       chatID: Number(chatID),
  //       sender: target,
  //       receiver: user_id,
  //       content: message_data.message,
  //       date: new Date(e.timeStamp).toLocaleTimeString(),
  //     };
  //     setMessageList([...messageList, new_message]);
  //   }
  // };

  const sendMessage = () => {
    if (message === '') return;
    const new_message: DbSendMessageItemType = {
      ChatID: Number(chatID),
      Sender: user_id,
      Receiver: target,
      Content: message,
      Date: new Date().toLocaleDateString().replace(/\//g, '-') + ' ' + new Date().toLocaleTimeString(),
    };
    dispatch(sendMessageData(new_message));
    // ws.send(new_message.Content);
    setMessage('');
  };

  const findTargetChat = () => {
    const target_chat = chatStore.chats.find((chat) => chat.id === Number(chatID));
    if (!target_chat) {
      dispatch(fetchChatData());
    } else {
      setTarget(target_chat.targetId);
      setDisplayName(target_chat.targetName);
    }
  };

  const scrollProcess = () => {
    if (divRef.current) divRef.current.scrollTo({ behavior: 'smooth', top: divRef.current.scrollHeight });
  };

  useEffect(() => {
    setMessageList(chatStore.messages);
    findTargetChat();
    scrollProcess();
  }, [chatStore]);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessageData(Number(chatID)));
    findTargetChat();
    if (noticeStore.messages.includes(Number(chatID))) dispatch(removeMessageNoticeData(Number(chatID)));
  }, [id]);

  return (
    <main className="message">
      <h2>{displayName}</h2>
      <section>
        <div className="message_area" ref={divRef}>
          <ul>
            {messageList.map((message, index) => (
              <li key={index} className={message.sender === user_id ? 'send' : 'receive'}>
                {message.sender === user_id ? null : (
                  <h4>
                    <IoPerson />
                    {displayName}
                  </h4>
                )}
                <div className="message" dangerouslySetInnerHTML={createMarkup(message.content)}></div>
                {index === messageList.length - 1 ? <div className="time">{message.date.replace('T', ' ').replace('Z', '')}</div> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="send_area">
          <div className="send_box">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <div className={message === '' ? 'send_btn' : 'send_btn enable'} onClick={sendMessage}>
              <IoIosSend />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MessagePage;
