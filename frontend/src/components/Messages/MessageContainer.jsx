import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import useJoinChannel from '../../Hooks/useJoinChannel'
import useGetChannelConversations from '../../Hooks/useGetChannelConversations'

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { getChannelConversations } = useGetChannelConversations()
  const { joinChannel } = useJoinChannel()
  const { authUser } = useAuthContext()
  const location = useLocation()
  const { pathname } = location
  const isChannel = pathname.includes('channels')

  const [isJoined, setIsJoined] = useState(false)

  const handleJoin = async () => {
    try {
      await joinChannel(selectedConversation._id, authUser._id)
      getChannelConversations()
      setSelectedConversation(null)
      window.location.reload();
    } catch (error) {
      console.error('Failed to join channel:', error)
    }
  }

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  useEffect(() => {
    if (selectedConversation && isChannel) {
      const participants = selectedConversation.participants || []

      const filter = participants.filter(
        participant => participant.username === authUser.username
      )
      if (
        filter.length > 0 ||
        selectedConversation?.createdBy?.username === authUser.username
      ) {
        setIsJoined(true)
      }
    }
  }, [selectedConversation])

  return (
    <div className='md:min-w-[450px] flex flex-col border-r border-slate-500 p-4'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span>{' '}
            <span className='text-gray-900 font-bold'>
              {selectedConversation?.fullName || selectedConversation?.name}
            </span>
          </div>

          <Messages />
          {isChannel ? (
            isJoined ? (
              <MessageInput />
            ) : (
              <button
                onClick={handleJoin}
                className='p-3 rounded-md m-1 bg-blue-600 cursor-pointer'
              >
                Join
              </button>
            )
          ) : (
            <MessageInput />
          )}
        </>
      )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  const { authUser } = useAuthContext()
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}
