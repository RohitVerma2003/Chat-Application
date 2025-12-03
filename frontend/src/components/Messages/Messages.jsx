import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkeleton from '../Skeletons/MessageSkeleton'
import useListenMessages from '../../Hooks/useListenMessages'
import { useLocation } from 'react-router-dom'
import useChannelGetMessages from '../../Hooks/useGetChannelMessages'

const Messages = () => {
  const location = useLocation()
  const { pathname } = location

  const {
    loading,
    messages,
    hasMore = false,
    getMessages
  } = pathname.includes('channels') ? useChannelGetMessages() : useGetMessages()

  useListenMessages()

  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && hasMore && (
        <button
          className='text-center bg-blue-600 rounded-md w-full p-1 cursor-pointer'
          onClick={getMessages}
        >
          Load more...
        </button>
      )}
      {!loading &&
        messages.length > 0 &&
        messages?.map(message => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading &&
        [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages
