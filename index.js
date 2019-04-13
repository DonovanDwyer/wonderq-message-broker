document.addEventListener('DOMContentLoaded', onInit);

const WonderQ = new WonderQMessageBroker();
const messageSuccess = document.querySelector(".message_success");
const messageForm = document.querySelector(".message_form");
const messageTextField = document.querySelector("#message_text_field");
const messageSubmitButton = document.querySelector("#message_submit_button");
const messageListContainer = document.querySelector(".message_list");
const processedMessageList = document.querySelector(".processed_message_list");
const messagePollingButton = document.querySelector("#message_polling_button");
const devToolLink = document.querySelector("#dev_tool_link");
const devToolDiv = document.querySelector(".dev_tool");
let messageList = [];

function onInit() {
  handleNewMessageBehavior();
  handleMessagePollingBehavior();
  handleDevToolClick();
  setInterval(() => populateDevTool(), 500);
};

function handleNewMessageBehavior() {
  let messageContent = "";
  messageForm.addEventListener('submit', function(event){
    event.preventDefault();
    messageContent = event.target.children[0].value;
    messageSuccess.innerText = `Message ID ${WonderQ.newMessage(messageContent)} successfully saved`;
    event.target.children[0].value = "";
  });
};

function handleMessagePollingBehavior() {
  messagePollingButton.addEventListener('click', function(event) {
    getNewMessages();
  });
};

function getNewMessages() {
  messageList = WonderQ.pollNewMessages();
  for (message in messageList) {
    let listItem = document.createElement('li');
    let processButton = document.createElement('button');
    let timeDisplay = document.createTextNode(`Message will be removed after ${WonderQ.timeoutSetting / 1000} seconds`)
    timeDisplay.className = "time_display";
    processButton.innerText = "Process Message";
    processButton.dataset.id = messageList[message].messageId;
    processButton.className = "process_button";
    listItem.innerHTML = `${messageList[message].messageContent}`;
    processButton.addEventListener('click', function(event){
      processMessage(this.dataset.id);
      listItem.remove();
    });
    listItem.appendChild(processButton);
    listItem.appendChild(timeDisplay);
    messageListContainer.appendChild(listItem);
  }
  setTimeout(() => handleReaddMessageList(messageList), WonderQ.timeoutSetting);
};

function handleReaddMessageList(messageList) {
  WonderQ.readdTimedOutMessages(messageList);
  messageList = [];
  messageListContainer.innerHTML = '';
};

function processMessage(messageId) {
  let savedMessage = messageList.find(message => message.messageId == messageId)
  let listItem = document.createElement('li');
  listItem.innerHTML = `<b>${savedMessage.messageContent}</b> (Message Saved)`;
  processedMessageList.appendChild(listItem);
  messageList = messageList.filter(message => message.messageId != messageId);
  WonderQ.logProcessedMessage();
};

function handleDevToolClick() {
  devToolDiv.style.display = 'none';
  devToolLink.addEventListener('click', function(event) {
    event.preventDefault();
    if(devToolLink.innerText === 'Show Dev Tool'){
      devToolLink.innerText = 'Hide Dev Tool';
      devToolDiv.style.display = 'block'
    } else if (devToolLink.innerText === 'Hide Dev Tool') {
      devToolLink.innerText = 'Show Dev Tool';
      devToolDiv.style.display = 'none'
    }
  })
};

function populateDevTool() {
  let messageCount = document.createElement('p');
  messageCount.innerText = `Current Number of Messages in Store: ${WonderQ.getMessageCount()}`;
  let messageInUseCount = document.createElement('p');
  messageInUseCount.innerText = `Current Number of Messages in Use By Other Users: ${WonderQ.getMessageInUseCount()}`;
  let messagesProcessedCount = document.createElement('p');
  messagesProcessedCount.innerText = `Number of Messages Processed to Date: ${WonderQ.getProcessedMessageCount()}`;
  devToolDiv.innerHTML = '';
  devToolDiv.appendChild(messageCount);
  devToolDiv.appendChild(messageInUseCount);
  devToolDiv.appendChild(messagesProcessedCount);
};
