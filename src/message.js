'use strict';

/**
 * Created by park9eon on 2019-01-07
 */

import {h, render} from 'preact';
import storage from './storage';
import './message.css';

const Message = ({message}) => (
    <div className="messageWrapper">
        <div className="message">
            <span className="messageText">{message}</span>
        </div>
    </div>
);

storage.randomMessage((message) => {
    const messageDOM = render((
        (<Message message={message}/>)
    ), document.body);

    setTimeout(() => {
        messageDOM.parentNode.removeChild(messageDOM);
    }, 10000);
});
