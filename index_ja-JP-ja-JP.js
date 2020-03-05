ドキュメントaddEventListener（ 'DOMContentLoaded'、onInit）;

const WonderQ = new WonderQMessageBroker（）; 
const messageSuccess =ドキュメントquerySelector（ " message\_success " ）; const messageForm =ドキュメントquerySelector（ " message\_form " ）; const messageTextField =ドキュメントquerySelector（ " \#message\_text\_field " ）; const messageSubmitButton =ドキュメントquerySelector（ " \#message\_submit\_button " ）; const messageListContainer =ドキュメントquerySelector（ " message\_list " ）; const processedMessageList =ドキュメントquerySelector（ " processed\_message\_list " ）; const messagePollingButton =ドキュメントquerySelector（ " \#message\_polling\_button " ）; const devToolLink =ドキュメントquerySelector（ " \#dev\_tool\_link " ）; const devToolDiv =ドキュメントquerySelector（ " dev\_tool " ）; messageList = \[\];

関数onInit（）\{ 
handleNewMessageBehavior（）; 
handleMessagePollingBehavior（）; 
handleDevToolClick（）; 
setInterval（（）= > populateDevTool（）、500）; 
\};

function handleNewMessageBehavior（）\{ 
let messageContent = " " ; 
messageForm.addEventListener（ 'submit'、function（event）\{ 
event.preventDefault（）; 
messageContent = event.target.children \[0\] .value; 
messageSuccess.innerText = `メッセージID $ {WonderQ.newMessage（messageContent）}は正常に保存されました` ; 
event.target.children \[0\] .value= " " ; 
\}）; 
\};

関数handleMessagePollingBehavior（）\{ 
messagePollingButton addEventListener（ 'クリック'、関数（イベント）\{ 
getNewMessages（）; 
\}）; 
\};

function getNewMessages（）\{ 
messageList = WonderQ.pollNewMessages（）; 
for（messageListのメッセージ）\{ 
let listItem = document.createElement（ 'li'）; 
let processButton = document.createElement（ 'button'）; 
let timeDisplay = document.createTextNode（ ` $ {WonderQ.timeoutSetting / 1000}秒後にメッセージが削除されます` ） 
timeDisplay.className = " time\_display " ; 
processButton.innerText = "プロセスメッセージ" ; 
processButton.dataset.id = messageList \[message\] .messageId; 
processButton.className = " process\_button " ; 
listItem.innerHTML = ` $ {messageList [message] .messageContent} ` ; 
processButton.addEventListener（ 'click'、function（event）\{ 
processMessage（this.dataset.id）; 
listItem.remove（）; 
\}）; 
listItem.appendChild（processButton）; 
listItem.appendChild（timeDisplay）; 
messageListContainer.appendChild（listItem）; 
\} 
setTimeout（（）= > handleReaddMessageList（messageList）、WonderQ.timeoutSetting）; 
\};

関数handleReaddMessageList（messageList）\{ 
WonderQ.readdTimedOutMessages（messageList）; messageList= \[\]; 
messageListContainer innerHTML = ''; 
\};

function processMessage（messageId）\{ 
let savedMessage = messageList.find（message= > message.messageId == messageId） 
let listItem = document.createElement（ 'li'）; 
listItem.innerHTML = ` <b> $ {savedMessage.messageContent} </b> （保存されたメッセージ） ` ; 
processedMessageList.appendChild（listItem）; 
messageList = messageList.filter（message= > message.messageId！= messageId）; 
WonderQ.logProcessedMessage（）; 
\};

関数handleDevToolClick（）\{ 
devToolDiv。表示= 'none'; 
devToolLink addEventListener（ 'クリック'、関数（イベント）\{ 
イベントpreventDefault（）; if（devToolLink。innerText = = = 'Devツールを表示'）\{ 
devToolLink・innerText = 'Devツールを結果'; 
devToolDiv。表示= 'block' 
\}他のif（devToolLink innerText = = = 'Devツールを結論'）\{ 
devToolLink・innerText = 'Devツールを表示'; 
devToolDiv。表示= 'なし' 
\} 
\}） 
\};

function populateDevTool（）\{ 
let messageCount = document.createElement（ 'p'）; 
messageCount.innerText = `ストア内の現在のメッセージ数：$ {WonderQ.getMessageCount（）} ` ; 
let messageInUseCount = document.createElement（ 'p'）; 
messageInUseCount.innerText = `他のユーザーが現在使用しているメッセージの数：$ {WonderQ.getMessageInUseCount（）} ` ; 
let messagesProcessedCount = document.createElement（ 'p'）; 
messagesProcessedCount.innerText = `までに処理されたメッセージの数：$ {WonderQ.getProcessedMessageCount（）} ` ; 
devToolDiv.innerHTML = ''; 
devToolDiv.appendChild（messageCount）; 
devToolDiv.appendChild（messageInUseCount）; 
devToolDiv.appendChild（messagesProcessedCount）; 
\};

