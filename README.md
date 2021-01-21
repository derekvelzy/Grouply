# Grouply
# Grouply #
[Link to Demo Video on Youtube](https://www.youtube.com/watch?v=rAhrUOLD_eM)

## Overview ##
This mobile app was created for people to join private group chats for people with similar interests, or create chat rooms for others to join. The chat room allos people to send instant messages and react to each message with emoji reactions.

## UX GIF ##
![image](https://grouply.s3-us-west-1.amazonaws.com/Grouplygif2.gif)

## Screenshots ##
<img src="https://grouply.s3-us-west-1.amazonaws.com/GrouplyWelcome.png" height="400">
<img src="https://grouply.s3-us-west-1.amazonaws.com/GrouplyLogin.png" height="400">
<img src="https://grouply.s3-us-west-1.amazonaws.com/GrouplyHome.png" height="400">
<img src="https://grouply.s3-us-west-1.amazonaws.com/GrouplyChat.png" height="400">
<img src="https://grouply.s3-us-west-1.amazonaws.com/GrouplyEmoji.png" height="400">

## Features ##
#### Authentication ####
- Users can signup and login with their Google account, or with an email and password.
- Users logout with the logout button in the Chat Room Lobby.

#### Chat Room Lobby ####
- Users can search/browse through existing chat rooms or ones they're already members of.
- Users can join existing chat rooms by entering a Nickname and Room Code.
  - They can join the chats they're already members of without the Room Code.
- Users can create their own chat rooms by specifying a Room Name, Code, and their Nickname for the Room.

#### In a Chat Room ####
- Users can send instant messages to other members in the specific room.
- Header bar will show which users are logged in and active in the room.
- Users can tap on a message from someone else and add an emoji reaction.
  - The emoji modal will popup showing the popular emojis used by the chat room.
  - To add another emoji to the popular ones in the group, go to the '+' button to popup a sliding drawer of all available emojis to select from.

## Tech/framework Used ##
__Built with__
- JavaScript
- React Native
- Firebase

## Run the Project Locally ##
From the repo
1. Clone the project locally
2. Run ```npm install``` in the command line
3. Run ```cd ios/ && pod install``` in the command line
3. Run ```npm run ios-max``` in the command line

--[Derek Velzy's Porfolio](https://www.dvelzyportfolio.com/)
