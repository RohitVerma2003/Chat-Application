import React, { useState } from 'react'
import useCreateChannel from '../../Hooks/useCreateChannel'

const CreateChannel = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const { loading, createChannel } = useCreateChannel()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      createChannel(name, description)
      setDescription('')
      setName('')
    } catch (error) {
      console.log('Error in creating the channel: ', error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Create a new
          <span className='text-blue-500'> Channel</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Name</span>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              className='w-full input input-bordered h-10 '
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Description</span>
            </label>
            <input
              type='text'
              placeholder='Enter Description'
              className='w-full input input-bordered h-10 '
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateChannel
