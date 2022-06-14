import React from 'react';
import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from '@components/ChatBox/styles';

const ChatBox = () => {
  return (
    <ChatArea>
      <Form>
        <MentionsTextarea />
        <Toolbox>
          <SendButton>전송</SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
