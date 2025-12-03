import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../Hooks/useSendMessage'
import { useLocation } from 'react-router-dom'
import useSendChannelMessage from '../../Hooks/useSendChannleMessage'

const MessageInput = () => {
  const location = useLocation()
  const { pathname } = location

  const [message, setMessage] = useState('')
  const { loading, sendMessage } = pathname.includes('channels')
    ? useSendChannelMessage()
    : useSendMessage()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage('')
  }
  return (
    <form onSubmit={handleSubmit} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-700 text-white'
          placeholder='Send a message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='absolute inset-y-0 end-0 flex items-center pe-3'
          disabled={loading}
        >
          {loading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
