'use strict';

/**
 * Created by park9eon on 2019-01-07
 */

export default {
    getMessageList(callback) {
        console.log(chrome);
        chrome.storage.local.get(['messageList'], ({messageList}) => {
            callback(messageList);
        });
    },
    addMessage(message, callback) {
        this.getMessageList((messageList = []) => {
            messageList.push(message);
            chrome.storage.local.set({ messageList }, callback);
        })
    },
    randomMessage(callback) {
        this.getMessageList((messageList = ['메세지를 입력해주세요.']) => {
            callback(messageList[Math.floor(Math.random() * messageList.length)]);
        });
    }
}
