import React, {useState, useEffect, useRef, useContext } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import {io} from "socket.io-client";

import { UserContext, SocketContext } from '../../../../context/Context';
import ChatMessageSent from './ChatMessageSent';
import ChatMessageReceived from './ChatMessageReceived';

import './Chat.scss';


function Chat() {
    const userUrl = "https://guntor-guntee-data-server.herokuapp.com/user/2"
    const message="Lorem ipsum"

    const socket=useContext(SocketContext);
    const [user, setUser]=useContext(UserContext);

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
        
        socket.on('joinRoom', (roomName, user) => {
            console.log(`'${user}' joined ${roomName}.`);
        });
        
        socket.on('chatMessage', (message, user)=>{
            setChats(
                prevState => [
                    ...prevState, 
                    <ChatMessageReceived 
                        userUrl={user}
                        message={message}
                        key={prevState.length} 
                    />
                ]
            );
        });
    }, [socket, user])

    const onClickSendButton = (e) => {
        e.preventDefault()
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


    return (
        <div className='chat-body'>
            <div className='chat-area'>
                <ChatMessageSent message={message} />
                <ChatMessageReceived userUrl={userUrl} message={message}/>
                {chats}
            </div>
            <Form>
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