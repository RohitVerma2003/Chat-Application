import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../Hooks/useGetConversations'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import useGetChannelConversations from '../../Hooks/useGetChannelConversations'

const SearchInput = () => {
  const location = useLocation();
  const {pathname} = location;

  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversation()
  const { conversations } = pathname.includes("channels")? useGetChannelConversations() : useGetConversations()

  const handleSubmit = e => {
    e.preventDefault()

    if (!search) return
    if (search.length < 3)
      return toast.error('Search term must be atleast 3 characters long')

    const conversation = conversations.find(
      c =>
        c?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        c?.name?.toLowerCase().includes(search.toLowerCase())
    )

    if (conversation) {
      setSelectedConversation(conversation)
    } else toast.error('No such user found with that name')
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered rounded-full'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput
