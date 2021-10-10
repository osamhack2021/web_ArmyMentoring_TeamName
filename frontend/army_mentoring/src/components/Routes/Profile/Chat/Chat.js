import React, {useState, useEffect, useRef, useContext } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import {io} from "socket.io-client";

import { UserContext, SocketContext } from '../../../../context/Context';
import ChatMessageSent from './ChatMessageSent';
import ChatMessageReceived from './ChatMessageReceived';

import './Chat.scss';


function Chat() {
    const socket = useContext(SocketContext);
    const [user, setUser] = useContext(UserContext);

    const [chats, setChats] = useState([]);
    const [currentInput, setCurrentInput] = useState("");

    useEffect(()=>{
        socket.emit('joinRoom', "myRoom", user.url);

        socket.on('connect', () => {
            console.log(socket.connected ,socket.id);
          });
          
        socket.on('disconnect', () => {
            console.log(socket.connected, socket.id);
        });
        
        socket.on('joinRoom', (roomName, userUrl) => {
            console.log(`'${userUrl}' joined ${roomName}.`);
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
    }, [socket, user])

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
        <div className='chat-body'>
            <div className='chat-area'>
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
                    <div onClick={onClickSendButton} className='send-button'>send</div>
                </FormGroup>
            </Form>
        </div>
    );
  }

  export default Chat;