import React, {useState, useEffect, useRef, useContext } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

import { UserContext, SocketContext } from '../../../context/Context';
import ChatMessageSent from './ChatMessageSent';
import ChatMessageReceived from './ChatMessageReceived';

import './Chat.scss';
import ChatAnnouncement from './ChatAnnouncement';
import { getFromUrl } from '../../../backend/common';
import { updateUserContextBySavedToken } from '../../../backend/auth';


function Chat() {
    const chatAreaRef = useRef();

    const socket = useContext(SocketContext);
    const [user, setUser] = useContext(UserContext);

    const [chats, setChats] = useState([]);
    const [currentInput, setCurrentInput] = useState("");

    useEffect(()=>{
        (async ()=>{ 
            const currentUser = await updateUserContextBySavedToken(setUser);

            socket.emit('joinRoom', "myRoom", currentUser.url);
    
            socket.on('connect', () => {
                console.log(socket.connected ,socket.id);
              });
              
            socket.on('disconnect', () => {
                console.log(socket.connected, socket.id);
            });
            
            socket.on('joinRoom', async (roomName, userUrl) => {
                const joinedUser = (await getFromUrl(userUrl)).data;
                setChats(
                    prevState=>[
                        ...prevState,
                        <ChatAnnouncement 
                            message={`${joinedUser.nickname}님이 입장했습니다!`}
                            key={prevState.length}
                        />
                    ]
                )
            });
            
            socket.on('chatMessage', (message, userUrl)=>{
                setChats(
                    prevState => [
                        ...prevState, 
                        <ChatMessageReceived 
                            userUrl={userUrl}
                            message={message}
                            key={prevState.length} 
                        />
                    ]
                );
            });
        })();
    }, []);

    useEffect(()=>{
        const chatAreaElement = chatAreaRef.current;
        console.dir(chatAreaElement);
        chatAreaElement.scrollTop = chatAreaElement.scrollHeight;
    }, [chats])

    const sendMessage = () => {
        socket.emit('chatMessage', currentInput, "myRoom", user.url);
        setChats(
            prevState => [
                ...prevState, 
                <ChatMessageSent 
                    message={currentInput}
                    key={prevState.length} 
                />
            ]);
        setCurrentInput('');
    }

    const onClickSendButton = (e) => {
        e.preventDefault();
        e.stopPropagation();
        sendMessage();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        sendMessage();
    }

    return (
        <div>
            <div className='title'>
                <div>멘토링 채팅방</div>
            </div>
            
            <div className='chat-body'>
                <div className='chat-area' ref={chatAreaRef}>
                    {chats}
                </div>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="typing-area">
                        <Input 
                            value={currentInput} 
                            onChange={e => setCurrentInput(e.target.value)}
                            className='typing-bar' 
                            type="text" 
                        />
                        <div onClick={onClickSendButton} className='send-button'>보내기</div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
  }

  export default Chat;