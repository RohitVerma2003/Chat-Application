import React from 'react'
import Togller from '../../components/Topbar/Togller'
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/Messages/MessageContainer'
import ChannelInfo from '../../components/Messages/ChannelInfo'
import useConversation from '../../zustand/useConversation'

const Channels = () => {
  const { selectedConversation } = useConversation()
  return (
    <div className=''>
      <Togller />
      <div className='flex sm:h-[450px] md:h-[550px] overflow-hidden rounded-lg shadow-md bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <Sidebar />
        <MessageContainer />
        {selectedConversation && <ChannelInfo />}
      </div>
    </div>
  )
}

export default Channels
