import React from 'react';
import Chat from "../../components/Chat"
import Container from '@material-ui/core/Container';

const Messages = () => {
    return (
        <div>
            <h2>Messages with Danielo Gonzalez</h2>
            <br />
            <br />
            <Container>
                <Chat />
            </Container>
        </div>
    )
};

export default Messages;
