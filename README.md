# 📩 Real-Time MERN Chat Application

A full-stack real-time chat application built with MERN Stack + Socket.IO, supporting Private Chats, Channel/Group Chats, Online Status, Chat Pagination, and Authentication with JWT & Cookies.

## Project Overview

This application lets you chat with your friends on real time using socktes. Built with Vite + React.js, MongoDB, and Node.js.

## Features

### 1. 🔐 User Authentication
- Register / Login with encrypted passwords
- JWT stored in httpOnly cookies
- Protected API routes

### 2. 💬 Private Messaging
- One-to-one chat support
- Real-time message sending via Socket.IO
- Message timestamps (12-hour format)
- Infinite scroll pagination (loads 20 older messages at a time)
- Auto scroll to latest message

### 3. 🧑‍🤝‍🧑 Channel / Group Chats
- Create channels
- Join / Leave channels
- Real-time group messages broadcast to all members
- Channel participant list with UI
- Channel message pagination
- Admin restrictions (admin cannot leave own channel)

### 4. Online Users Tracking and Typing Indicator 
- Live list of online members using socket room connections
- Green status indicator on active users
- Typing Indicators using redis pub-sub

### 5. 🔔 Live Events
- New message real-time updates
- Channel joined event handling
- Sidebar updates when members join or leave

### 6. 🔎 Conversation Search
- Search users & channels by name
- Fast lookup via Zustand store

### 7. 📁 Persistent State
- Saved conversations & messages in Zustand
- Clears message state only when switching chats

## Technology Stack

- **Frontend**: Vite + React
- **Backend**: Node.js
- **Database**: MongoDB , Redis
- **State Management**: React Zustand and Hooks
- **Styling**: Tailwind CSS

## Folder structure

```markdown
backend/
    ├── controllers/
        ├── auth.controller.js
        ├── channel.controller.js
        ├── message.controller.js
        └── user.controller.js
    ├── db/
        └── connectToMongoDB.js
    ├── middleware/
        └── protectRoute.js
    ├── models/
        ├── channel.model.js
        ├── conversation.model.js
        ├── message.model.js
        └── user.model.js
    ├── routes/
        ├── auth.routes.js
        ├── channel.routes.js
        ├── message.routes.js
        └── user.routes.js
    ├── socket/
        └── socket.js
    ├── utils/
        └── generateToken.js
    └── server.js
frontend/
    ├── public/
        ├── background1.svg
        └── vite.svg
    ├── src/
        ├── assets/
            └── react.svg
        ├── components/
            ├── Messages/
                ├── ChannelInfo.jsx
                ├── Message.jsx
                ├── MessageContainer.jsx
                ├── MessageInput.jsx
                └── Messages.jsx
            ├── Sidebar/
                ├── Conversation.jsx
                ├── Conversations.jsx
                ├── LogoutButton.jsx
                ├── SearchInput.jsx
                └── Sidebar.jsx
            ├── Skeletons/
                └── MessageSkeleton.jsx
            └── Topbar/
                └── Togller.jsx
        ├── context/
            ├── AuthContext.jsx
            └── SocketContext.jsx
        ├── Hooks/
            ├── useCreateChannel.js
            ├── useGetChannelConversations.js
            ├── useGetChannelMessages.js
            ├── useGetConversations.js
            ├── useGetMessages.js
            ├── useJoinChannel.js
            ├── useLeaveChannel.js
            ├── useListenMessages.js
            ├── useLogin.js
            ├── useLogout.js
            ├── useSendChannleMessage.js
            ├── useSendMessage.js
            └── useSignup.js
        ├── pages/
            ├── Channels/
                └── Channels.jsx
            ├── CreateChannel/
                └── CreateChannel.jsx
            ├── Home/
                └── Home.jsx
            ├── Login/
                └── Login.jsx
            └── Signup/
                ├── GenderCheckbox.jsx
                └── SignUp.jsx
        ├── utils/
            └── extractTime.js
        ├── zustand/
            └── useConversation.js
        ├── App.css
        ├── App.jsx
        ├── index.css
        └── main.jsx
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
.gitignore
package-lock.json
package.json
README.md
tailwind.config.js
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/RohitVerma2003/Chat-Application.git
cd Chat-Application
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. Start the backend development server:
```bash
npm run dev
```

5. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Development

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm start
```

## Acknowledgments

- React.js team for the amazing libraray.
- MongoDB team for the reliable database.
- Zustand team for amazing state management library.

## Support

For support, please create an issue in the repository or contact [RohitVerma2003](https://github.com/RohitVerma2003).

---

Built with ❤️ by [RohitVerma2003](https://github.com/RohitVerma2003)
