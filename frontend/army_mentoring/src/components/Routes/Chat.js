import React, {useState, useEffect } from 'react';
import './Chat.scss';
import { Button, Form, FormGroup, Input } from 'reactstrap';

function Chat() {
    
    return (
        <div className='chat-body'>
            <div className='chat-area'>
                <div className='chat-me'>
                    <img src="" alt="profile_image" className="profile-image"></img>
                    <div className="description">
                        <div className="text">
                            안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요  
                        </div>
                    </div>
                </div>
                <div className='chat-you'><div className="description">
                        <div className="text">
                            요 안녕하세요  
                        </div>
                    </div>
                    <img src="" alt="profile_image" className="profile-image"></img>
                </div>
            </div>
            <Form>
                <FormGroup className="typing-area">
                    <Input className='typing-bar' type="text"></Input>
                    <div className='send-button'>send</div>
                </FormGroup>
            </Form>
        </div>
    );
  }

  export default Chat;