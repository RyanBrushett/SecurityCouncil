Participant chats with room
===========================

**Preconditions:**

- Administrator has created as room
- Administrator has put forward a resolution

**Postconditions:**

None

**Happy case scenario:**

1. User informs system of desire to chat
2. The system provides the user with a textarea in which the user can enter a message to be broadcasted
3. User enters message into textarea
4. User submits the message for broadcast
5. The system broadcasts the message to all other users in the same room
    1. The system fails to broadcast the message to the users in the same room
    2. The system informs the user of the failure to broadcast the message
6. The system informs the user that the message has been broadcasted
