
import React, { useState } from 'react'

const ReactionButton = ({ }) => {
    const [reactionBox, setReactionBox] = useState('')


    const reactionLike = () => {
        reactionBox === 'like' ? setReactionBox('') : setReactionBox('like')
    }


    const reactionUnlike = () => {
        reactionBox === 'unlike' ? setReactionBox('') : setReactionBox('unlike')
    }



    return (
        <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
                <p className='text-sm'>354</p>
                <i onClick={reactionLike} className={`pi ${reactionBox === 'like' ? 'pi-thumbs-up-fill' : 'pi-thumbs-up'} cursor-pointer active:scale-125 duration-200 `}></i>
            </div>
            <div className='flex items-center gap-2'>
                <i onClick={reactionUnlike} className={`pi ${reactionBox === 'unlike' ? 'pi-thumbs-down-fill' : 'pi-thumbs-down'} cursor-pointer active:scale-125 duration-200 `}></i>
                <p className='text-sm'>35</p>
            </div>
        </div>
    )
}

export default ReactionButton