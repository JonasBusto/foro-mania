import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserAction } from '../hooks/useUserAction'

export const UsersSummary = () => {

    const {id} = useParams()

    const { getUser, user } = useUserAction()


  return (
    <div>
        <h2 className='text-white'>
            User id: {id}
        </h2>
    </div>
  )
}
