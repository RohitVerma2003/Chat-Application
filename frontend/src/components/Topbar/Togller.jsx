import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Togller = () => {
  const location = useLocation()
  const { pathname } = location
  return (
    <div className='w-full justify-around flex overflow-hidden rounded-lg shadow-md bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0 mb-2'>
      <Link
        to={'/'}
        className={`w-full text-center p-3 rounded-md ${pathname === '/' && 'bg-blue-600'}`}
      >
        Private
      </Link>
      <Link
        to={'/channels'}
        className={`w-full text-center p-3 rounded-md ${
          pathname === '/channels' && 'bg-blue-600'
        }`}
      >
        Channels
      </Link>
    </div>
  )
}

export default Togller
