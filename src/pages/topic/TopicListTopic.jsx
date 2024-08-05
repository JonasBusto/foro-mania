import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCommentAction } from '../../hooks/useCommentAction';

const TopicListTopic = ({ topic }) => {
    const { allComments, fetchComments } = useCommentAction();


    useEffect(() => {
        fetchComments(topic.id)
    }, [])


    return (
        <div className='flex text-center border-b border-neutral-500 pb-3 mb-3'>
            <Link to={`/topic/${topic.id}`} className='w-7/12 text-start'>
                <h2 className='text-lg font-semibold mb-1'>{topic.title}</h2>
                <p className='leading-5'>{topic.content.slice(0, 150)}... <span className='text-neutral-400'>Leer Mas</span> </p>
            </Link>
            <div className='w-3/12 flex items-center justify-center'>
                <img src="" alt="" />
            </div>
            <div className='w-1/12 flex items-center justify-center'>
                <p>{allComments.length}</p>
            </div>
            <div className='w-1/12 flex items-center justify-center'>
                <p>13hs</p>
            </div>

        </div>
    )
}

export default TopicListTopic