import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'
import { set } from 'mongoose'

const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [currentChannel, setCurrentChannel] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { authUser } = useAuthContext()

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8000', {
        query: {
          userId: authUser._id
        }
      })

      setSocket(socket)

      socket.on('getOnlineUsers', users => {
        setOnlineUsers(users)
      })

      return () => socket.close()
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [authUser])

  const joinChannel = channelId => {
    if (!socket) return

    if (currentChannel) {
      socket.emit('leaveChannel', currentChannel)
    }

    socket.emit('joinChannel', channelId)
    setCurrentChannel(channelId)
  }

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, joinChannel, currentChannel }}
    >
      {children}
    </SocketContext.Provider>
  )
}
