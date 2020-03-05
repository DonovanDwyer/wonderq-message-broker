mm\-ok

関数 getRandomMessage \(\) \{
メッセージを返す \[計算. 床 \(数学. ランダム \(\)\* メッセージの長さ\)\];\};

関数 emulateUserPost \(\) \{
WonderQ.newMessage\(getRandomMessage\(\)\);\};

関数 emulateUserPoll \(\) \{
WonderQ.pollNewMessages\(\);\};

setInterval \(\(\) = > emulateUserPost \(\)、5000\);
setInterval \(\(\) = > emulateUserPost \(\)、3000\);
setInterval \(\(\) = > emulateUserPost \(\)、500\);

setInterval（（）= > emulateUserPoll（）、15000）; 
setInterval（（）= > emulateUserPoll（）、10000）; 
setInterval（（）= > emulateUserPoll（）、50000）;正しい
人

