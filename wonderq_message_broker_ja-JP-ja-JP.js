クラスWonderQMessageBroker \{ 
コンストラクタ（）\{ 
mockDbMessageStore = \[\]; 
messageId = 0; 
このtimeoutSetting = 15000; 
messagesInUse = 0; 
messagesProcessed = 0; 
\};

newMessage（messageContent）\{ 
mockDbMessageStore（\{messageId：\+ \+この。messageId、messageContent：messageContent\}）; 
このmessageIdを返します
\};

pollNewMessages（）\{ 
messageList = \[\]; 
while（このmockDbMessageStoreの長さ> 0）\{ 
messageList（mockDbMessageStore（）を押します
messagesInUse \+ \+; 
\}; 
messageListを返す; 
\};

readdTimedOutMessages（messageList）\{ 
このmessagesInUse\- = messageListの長さ; mockDbMessageStore =この。mockDbMessageStore（messageList）; 
\};

getTimeoutSetting（）\{ 
このtimeoutSettingを返します
\};

changeTimeoutSetting（newTimeoutSetting）\{ 
timeoutSetting = newTimeoutSetting; 
\};

getMessageCount（）\{ 
mockDbMessageStoreの長さを返します
\};

getMessageInUseCount（）\{ 
このmessagesInUseを返します
\};

getProcessedMessageCount（）\{ 
このmessagesProcessedを返します
\};

logProcessedMessage（）\{ 
このmessagesInUse\-\-; 
メッセージ処理済み\+ \+; 
\}; 
\}

