import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'
import { set } from 'mongoose'
import useGetChannelConversations from '../Hooks/useGetChannelConversations'
import useConversation from '../zustand/useConversation'

const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [currentChannel, setCurrentChannel] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { authUser } = useAuthContext()
  const { getChannelConversations } =
    useGetChannelConversations()

  useEffect(() => {
    if (authUser) {
      const socket = io('https://chat-app-rv.onrender.com', {
        query: {
          userId: authUser._id
        }
      })

      setSocket(socket)

      socket.on('getOnlineUsers', users => {
        setOnlineUsers(users)
      })

      socket?.on('channelCreated', () => {
        getChannelConversations()
      })

      socket?.on('channelJoined', async channelId => {
        await getChannelConversations()

        const { channelConversations, selectedConversation, setSelectedConversation } =
          useConversation.getState()

        const conversation = channelConversations.find(con => con?._id === channelId)

        if (
          selectedConversation &&
          selectedConversation?._id === channelId &&
          conversation
        ) {
          setSelectedConversation(conversation)
        }
      })

      socket?.on('channelLeaved', async channelId => {
        await getChannelConversations()

        const { channelConversations, selectedConversation, setSelectedConversation } =
          useConversation.getState()

        const conversation = channelConversations.find(con => con?._id === channelId)

        if (
          selectedConversation &&
          selectedConversation?._id === channelId &&
          conversation
        ) {
          setSelectedConversation(conversation)
        }
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
