WonderQメッセージブローカAPIドキュメント
-------------------------

新しいメッセージを投稿する
-------------

https://api.wonderq.com/messages/newPOST POST要求を次のURLに送信します。要求を送信するときは、必ずヘッダーにAPIトークンを含めるようにしてください。 
元。 "承認：ベアラー$ \{トークン\} " ） 
メッセージはJSON形式である必要があります。成功した場合は、ID番号を含むJSON応答を受信します
投稿。

投稿されたメッセージのロケール
---------------

GETリクエストを次のURLに送信しますhttps://api.wonderq.com/messages [](https://api.wonderq.com/messages) API成功した場合は、各未処理のJSON応答を受信します
その時点でキューに入っていたメッセージ、およびそれぞれのメッセージID。

メッセージを処理
--------

他のユーザーがアクセスできるようにする。メッセージが表示されないようにするために、 
他のユーザーは、ストアから効果的に削除。 
APIへのプロセス要求。これを行うには、POST要求を次のURLに送信しますhttps://api.wonderq.com/messages/process [](https://api.wonderq.com/messages/process) APIまた、JSON形式でメッセージIDを含める必要があります。成功すると、JSON応答が表示されます。

