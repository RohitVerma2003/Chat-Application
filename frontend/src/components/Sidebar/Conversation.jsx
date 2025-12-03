import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'
import { useLocation } from 'react-router-dom'

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const location = useLocation()
  const { pathname } = location

  const isSelected = selectedConversation?._id === conversation._id

  const { onlineUsers, joinChannel } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  const handleSelect = () => {
    setSelectedConversation(conversation)

    if (pathname.includes('channels')) {
      joinChannel(conversation._id)
    }
  }

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'bg-sky-500' : ''
        }`}
        onClick={handleSelect}
      >
        <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
          <div className='w-12 rounded-full'>
            <img
              src={
                conversation.profilePic ||
                'https://api.dicebear.com/9.x/fun-emoji/svg'
              }
              alt='user avatar'
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>
              {conversation?.fullName || conversation?.name}
            </p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation
