import React from 'react'
import { useParams } from 'react-router-dom'

export const UsersSummary = () => {

    const {username} = useParams()


  return (
    <div>
        <h2 className='text-white'>
            Username {username}
        </h2>
    </div>
  )
}
