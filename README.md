# Chat Application

A MERN application that allows real time chat experience.

## Project Overview

This application lets you chat with your friends on real time using socktes. Built with Vite + React.js, MongoDB, and Node.js.

## Features

### 1. Authentication
- User authentication using username and password.
- MongoDB is used to store data of the user.

### 2. Real time Chat
- Real time chats with your friend.
- Sockets are used for real time chat experience.

### 3. User Experience
- Responsive design
- Real-time database updation

## Technology Stack

- **Frontend**: Vite + React
- **Backend**: Node.js
- **Database**: MongoDB
- **State Management**: React Zustand and Hooks
- **Styling**: Tailwind CSS

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

3. Create a `.env.local` file in the root directory:
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
