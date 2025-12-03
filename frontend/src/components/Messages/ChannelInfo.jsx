import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'
import { useAuthContext } from '../../context/AuthContext'
import useLeaveChannel from '../../Hooks/useLeaveChannel'

const Participant = ({ participant, isAdmin }) => {
  const { onlineUsers } = useSocketContext()
  return (
    <div key={participant?._id}>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1`}
      >
        <div
          className={`avatar ${
            onlineUsers?.includes(participant?._id) && 'avatar-online'
          }`}
        >
          <div className='w-12 rounded-full'>
            <img
              src={
                participant.profilePic ||
                'https://api.dicebear.com/9.x/fun-emoji/svg'
              }
              alt='user avatar'
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>
              {participant?.fullName || participant?.name}{' '}
              {isAdmin && <span className='text-sm'>(Admin)</span>}
            </p>
          </div>
        </div>
      </div>
      {<div className='divider my-0 py-0 h-1'></div>}
    </div>
  )
}

const ChannelInfo = () => {
  const { selectedConversation } = useConversation()
  const { authUser } = useAuthContext()
  const inGroup =
    selectedConversation &&
    selectedConversation.participants.find(user => user?._id === authUser?._id)
  const { loading, leaveChannel } = useLeaveChannel()

  const handleLeave = async () => {
    try {
      if (!selectedConversation) return
      const data = await leaveChannel(selectedConversation?._id, authUser?._id)
      if (!data.error) window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='md:min-w-[250px] flex flex-col'>
      <div className='p-4'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <div className='avatar'>
            <div className='w-12 rounded-full'>
              <img
                src={'https://api.dicebear.com/9.x/fun-emoji/svg'}
                alt='user avatar'
              />
            </div>
          </div>
          <p className='text-lg font-bold'>{selectedConversation?.name}</p>
          <p className='text-sm'>{selectedConversation?.description}</p>
          {inGroup && (
            <button
              onClick={handleLeave}
              className='p-2 bg-blue-600 rounded-md cursor-pointer'
              disabled={loading}
            >
              Leave Channel
            </button>
          )}
        </div>

        <p className='mt-3 mb-1'>Participants:</p>

        <div className='overflow-y-auto max-h-94 mt-2 pr-2'>
          {selectedConversation?.participants?.map(participant => (
            <Participant
              participant={participant}
              isAdmin={
                selectedConversation?.createdBy?._id === participant?._id
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChannelInfo
