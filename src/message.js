'use strict';

/**
 * Created by park9eon on 2019-01-07
 */

import {Component, h, render} from 'preact';
import storage from './storage';
import './message.scss';

const timeout = 3000;
const animationDuration = 1000;

class Message extends Component {
    constructor(props) {
        super(props);
        this.state.visibility = false;
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        this.setState({visibility: true});
        setTimeout(() => {
            this.onClose();
        }, timeout - animationDuration);
    }

    onClose() {
        this.setState({visibility: false});
    }

    render({message}, {visibility}, context) {
        return (
            <div className={visibility ? "messageWrapper show" : "messageWrapper hide"}
                 style={{animationDuration}}
                 onClick={this.onClose}>
                <p className="message">{message}</p>
            </div>
        );
    }
}

storage.randomMessage((message) => {
    const messageDOM = render((
        (<Message message={message}/>)
    ), document.body);
    setTimeout(() => {
        messageDOM && messageDOM.parentNode.removeChild(messageDOM);
    }, timeout);
});
