## WonderQ Message Broker API Documentation

## Posting a New Message
Send a POST request to the following URL:
https://api.wonderq.com/messages/new
When sending a POST request, be sure to include your API token in the header
(Ex. "Authorization: Bearer ${token}")
Your message will need to be in JSON format.
If successful, you will receive a JSON response containing the ID number of your
post.

## Polling for Posted Messages
Send a GET request to the following URL:
https://api.wonderq.com/messages
Your API token must be included in the request header.
If successful, you will receive a JSON response containing each unprocessed
message that was in the queue at the time, along with the respective message ID.

## Process a Message
Messages that are not marked as processed are returned to the message store
to be accessed by other users. In order to prevent a message from being seen by
other users, and to effectively remove it from the store, you will need to send
a process request to the API. To do so, send a POST request to the following URL:
https://api.wonderq.com/messages/process
Your API token will need to be in the header.
You will also need to include the message ID in JSON format.
If successful, you will receive a JSON response saying so.
