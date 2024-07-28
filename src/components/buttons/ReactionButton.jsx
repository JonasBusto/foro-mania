import { Badge } from 'primereact/badge'
import React from 'react'

const ReactionButton = ({ reaction = '👍', value = 0 }) => {
    return (
        <div>
            <button className='text-2xl hover:scale-125 duration-200 p-overlay-badge'>{value > 0 && <Badge value={value}></Badge>} {reaction}</button>
        </div>
    )
}

export default ReactionButton