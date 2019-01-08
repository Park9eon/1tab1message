'use strict';

/**
 * Created by park9eon on 2019-01-07
 */

export default {
    getMessageList(callback) {
        chrome.storage.local.get(['messageList'], ({messageList = ["메시지를 입력해주세요."]}) => {
            console.log(messageList);
            callback(messageList);
        });
    },
    addMessage(message, callback) {
        this.getMessageList((messageList) => {
            messageList.push(message);
            this.saveMessageList(messageList, callback);
        })
    },
    saveMessageList(messageList, callback) {
        chrome.storage.local.set({ messageList }, callback);
    },
    randomMessage(callback) {
        this.getMessageList((messageList) => {
            const message = messageList[Math.floor(Math.random() * messageList.length)];
            callback(message);
        });
    }
}
