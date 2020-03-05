class WonderQMessageBroker {
  constructor() {
    this.mockDbMessageStore = [];
    this.messageId = 0;
    this.timeoutSetting = 15000;
    this.messagesInUse = 0;
    this.messagesProcessed = 0;
  };

  newMessage(messageContent) {
    this.mockDbMessageStore.push({messageId: ++this.messageId, messageContent: messageContent});
    return this.messageId;
  };

  pollNewMessages() {
    let messageList = [];
    while (this.mockDbMessageStore.length > 0) {
      messageList.push(this.mockDbMessageStore.pop());
      this.messagesInUse++;
    };
    return messageList;
  };

  readdTimedOutMessages(messageList) {
    this.messagesInUse -= messageList.length;
    this.mockDbMessageStore = this.mockDbMessageStore.concat(messageList);
  };

  getTimeoutSetting() {
    return this.timeoutSetting;
  };

  changeTimeoutSetting(newTimeoutSetting) {
    this.timeoutSetting = newTimeoutSetting;
  };

  getMessageCount() {
    return this.mockDbMessageStore.length;
  };

  getMessageInUseCount() {
    return this.messagesInUse;
  };

  getProcessedMessageCount() {
    return this.messagesProcessed;
  };

  logProcessedMessage() {
    this.messagesInUse--;
    this.messagesProcessed++;
  };
}
Edit this, dingus
And this too, genius
And one to grow on
