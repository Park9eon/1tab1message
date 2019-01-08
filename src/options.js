'use strict';

/**
 * Created by park9eon on 2019-01-08
 */
import {render, h, Component} from 'preact';
import storage from './storage';
import "./options.scss";

class Options extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onReset();
    }

    onChange(e, i) {
        const {messageList} = this.state;
        messageList[i] = e.target.value;
        this.setState({messageList});
    }

    onAdd() {
        const {messageList} = this.state;
        messageList.push('');
        this.setState({messageList});
    }

    onSave() {
        const {messageList} = this.state;
        storage.saveMessageList(messageList.map(v => v), () => {
            this.onReset();
        });
    }

    onDelete(index) {
        const {messageList} = this.state;
        messageList.splice(index, 1);
        this.setState({messageList});
    }

    onReset() {
        this.setState({messageList: []});
        storage.getMessageList((messageList = []) => {
            this.setState({messageList});
        });
    }

    render() {
        const {messageList} = this.state;
        return (
            <div>
                <h1>메시지 목록</h1>
                <div className="form">
                    {messageList.map((message, i) => (
                        <div key={i}
                             className="form-group">
                            <input className="form-control"
                                   type="text"
                                   onChange={(e) => this.onChange(e, i)}
                                   value={message}/>
                            <button className="form-action btn"
                                    onClick={() => this.onDelete(i)}>삭제
                            </button>
                        </div>
                    ))}
                    <button className="btn btn-success"
                            onClick={this.onAdd}>추가
                    </button>
                </div>
                <div className="btn-group">
                    <button className="btn btn-danger"
                            onClick={this.onReset}>취소
                    </button>
                    <button className="btn btn-primary"
                            onClick={this.onSave}>저장
                    </button>
                </div>
            </div>
        );
    }
}

render((<Options/>), document.getElementById('app'));
