import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/Messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] overflbow-hidden rounded-lg shadow-md bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
