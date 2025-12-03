import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations'
import { Link, useLocation } from 'react-router-dom'
import useGetChannelConversations from '../../Hooks/useGetChannelConversations'

const Conversations = () => {
  const location = useLocation()

  const { pathname } = location

  const { loading, conversations } = pathname.includes('channels')
    ? useGetChannelConversations()
    : useGetConversations()
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      <Link
        to={'/createChannel'}
        className='p-2 mb-3 rounded-md bg-blue-600 text-center font-semibold'
      >
        Create New Channel
      </Link>
      {conversations?.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={index === conversations.length - 1}
        />
      ))}
      {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  )
}

export default Conversations
