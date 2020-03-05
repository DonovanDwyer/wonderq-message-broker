ドキュメント addEventListener \(' DOMContentLoaded ',onInit\);

const WonderQ = new WonderQMessageBroker \(\);
const messageSuccess = ドキュメント querySelector \("message\_success"\);const messageForm = ドキュメント querySelector \("message\_form"\);const messageTextField = ドキュメント querySelector \("\#message\_text\_field"\);const messageSubmitButton = ドキュメント querySelector \("\#message\_submit\_button"\);const messageListContainer = ドキュメント querySelector \("message\_list"\);const processedMessageList = ドキュメント querySelector \("processed\_message\_list"\);const messagePollingButton = ドキュメント querySelector \("\#message\_polling\_button"\);const devToolLink = ドキュメント querySelector \("\#dev\_tool\_link"\);const devToolDiv = ドキュメント querySelector \("dev\_tool"\);messageList = \[\];

関数 onInit \(\) \{
handleNewMessageBehavior\(\);
handleMessagePollingBehavior\(\);
handleDevToolClick\(\);
setInterval \(\(\) = > populateDevTool \(\)、500\);
\};

function handleNewMessageBehavior\(\) \{
let messageContent = "";
messageForm.addEventListener\('submit', function\(event\)\{
event.preventDefault\(\);
messageContent = event.target.children\[0\].value;
messageSuccess.innerText = `Message ID ${WonderQ.newMessage(messageContent)} successfully saved`;
event.target.children\[0\].value = "";
\}\);
\};

関数 handleMessagePollingBehavior \(\) \{
messagePollingButton addEventListener \(' クリック '、関数 \(イベント\) \{
getNewMessages\(\);
\}\);
\};

function getNewMessages\(\) \{
messageList = WonderQ.pollNewMessages\(\);
for \(message in messageList\) \{
let listItem = document.createElement\('li'\);
let processButton = document.createElement\('button'\);
let timeDisplay = document.createTextNode\(`Message will be removed after ${WonderQ.timeoutSetting / 1000} seconds`\)
timeDisplay.className = "time\_display";
processButton.innerText = "Process Message";
processButton.dataset.id = messageList\[message\].messageId;
processButton.className = "process\_button";
listItem.innerHTML = `${messageList[message].messageContent}`;
processButton.addEventListener\('click', function\(event\)\{
processMessage\(this.dataset.id\);
listItem.remove\(\);
\}\);
listItem.appendChild\(processButton\);
listItem.appendChild\(timeDisplay\);
messageListContainer.appendChild\(listItem\);
\}
setTimeout\(\(\) => handleReaddMessageList\(messageList\), WonderQ.timeoutSetting\);
\};

関数 handleReaddMessageList \(messageList\) \{
WonderQ.readdTimedOutMessages\(messageList\);messageList = \[\];
messageListContainer innerHTML = ' ';
\};

function processMessage\(messageId\) \{
let savedMessage = messageList.find\(message => message.messageId == messageId\)
let listItem = document.createElement\('li'\);
listItem.innerHTML = `<b>${savedMessage.messageContent}</b> (Message Saved)`;
processedMessageList.appendChild\(listItem\);
messageList = messageList.filter\(message => message.messageId \!= messageId\);
WonderQ.logProcessedMessage\(\);
\};

関数 handleDevToolClick \(\) \{
devToolDiv. 表示= ' none ';
devToolLink addEventListener \(' クリック ',関数 \(イベント\) \{
イベント preventDefault \(\);if \(devToolLink. innerText= = = ' Dev ツールを表示 '\) \{
devToolLink ・ innerText= ' Dev ツールを隠す ';
devToolDiv. 表示= ' block '
\} 他の if \(devToolLink innerText= = = ' Dev ツールを隠す '\) \{
devToolLink ・ innerText= ' Dev ツールを表示 ';
devToolDiv. 表示= ' none '
\}
\}\)
\};

function populateDevTool\(\) \{
let messageCount = document.createElement\('p'\);
messageCount.innerText = `Current Number of Messages in Store: ${WonderQ.getMessageCount()}`;
let messageInUseCount = document.createElement\('p'\);
messageInUseCount.innerText = `Current Number of Messages in Use By Other Users: ${WonderQ.getMessageInUseCount()}`;
let messagesProcessedCount = document.createElement\('p'\);
messagesProcessedCount.innerText = `Number of Messages Processed to Date: ${WonderQ.getProcessedMessageCount()}`;
devToolDiv.innerHTML = '';
devToolDiv.appendChild\(messageCount\);
devToolDiv.appendChild\(messageInUseCount\);
devToolDiv.appendChild\(messagesProcessedCount\);
\};

