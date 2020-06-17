import React from "react";
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageList } from 'react-chat-elements';

const Chat = () => {

	return (
		<MessageList
			className='message-list'
			lockable={true}
			toBottomHeight={'100%'}
			dataSource={[
				{
					position: 'right',
					type: 'text',
					text: 'Hey, I would love to help you out during weekends!',
					date: new Date(2020, 5, 16, 3, 24, 0),
				},
				{
					position: 'left',
					type: 'text',
					text: 'Hey! Nice to meet you! We should discuss this face to face. What\'s your number?',
					date: new Date(2020, 5, 16, 9, 24, 0),
				},
				{
					position: 'right',
					type: 'text',
					text: '928-221-6170  Feel free to call me between 3 and 5 P.M.',
					date: new Date(2020, 5, 16, 10, 24, 0),
				},
			]} />
	);
};

export default Chat;
