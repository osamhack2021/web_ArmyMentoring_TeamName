import React, {useState, useEffect, useRef } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import ChatMessageSent from './ChatMessageSent';
import ChatMessageReceived from './ChatMessageReceived';

import './Chat.scss';

function Chat() {
    const userUrl = "https://guntor-guntee-data-server.herokuapp.com/user/2"
    const message="Lorem ipsum"

    const [chats, setChats] = useState([]);
    const [currentInput, setCurrentInput] = useState("");

    const onClickSendButton = (e) => {
        e.preventDefault()
        setChats(prevState=>{
            prevState.push(
                <ChatMessageSent message={currentInput} />
            )
        });
        setCurrentInput('');    
    }


    return (
        <div className='chat-body'>
            <div className='chat-area'>
                <ChatMessageSent message={message} />
                <ChatMessageReceived userUrl={userUrl} message={message}/>
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