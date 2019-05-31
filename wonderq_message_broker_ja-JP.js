クラス WonderQMessageBroker \{
コンストラクタ \(\) \{
mockDbMessageStore = \[\];
messageId = 0;
この timeoutSetting = 15000;
messagesInUse = 0;
messagesProcessed = 0;
\};

newMessage\(messageContent\) \{
mockDbMessageStore \(\{messageId: \+ \+ この. messageId,messageContent: messageContent\}\);
この messageId を返します。
\};

pollNewMessages\(\) \{
messageList = \[\];
while \(この mockDbMessageStore の長さ > 0\) \{
messageList \(mockDbMessageStore \(\) を押します。
messagesInUse \+ \+;
\};
messageList を返す;
\};

readdTimedOutMessages\(messageList\) \{
この messagesInUse\-= messageList の長さ;mockDbMessageStore = この. mockDbMessageStore \(messageList\);
\};

getTimeoutSetting\(\) \{
この timeoutSetting を返します。
\};

changeTimeoutSetting\(newTimeoutSetting\) \{
timeoutSetting = newTimeoutSetting;
\};

getMessageCount\(\) \{
mockDbMessageStore の長さを返します。
\};

getMessageInUseCount\(\) \{
この messagesInUse を返します。
\};

getProcessedMessageCount\(\) \{
この messagesProcessed を返します。
\};

logProcessedMessage\(\) \{
この messagesInUse\-\-;
messagesProcessed \+ \+;
\};
\}

