import React, { useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import ReactionButton from '../../components/buttons/ReactionButton';


const TopicComment = ({ data }) => {
  const [reactionBox, setReactionBox] = useState('')


  const TimeToNow = (fecha) => {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  }



  return (
    <div className='relative'>
      <div className='py-3 flex justify-between'>
        <div className='flex gap-4'>
          <img src={data.userImg} alt="Imagen de usuario" className='w-12 h-12 object-cover rounded-full' />
          <h3 className='font-semibold text-lg'>{data.user}</h3>
        </div>
        <div>
          <p>{TimeToNow(data.date)}</p>
        </div>
      </div>
      <div className='leading-loose'>
        <p>
          {data.content}
        </p>
      </div>
      <div className='flex flex-col md:flex-row justify-between border-b border-neutral-600 px-4 py-2 md:items-center my-8'>
        <div className='ms-auto border-s border-neutral-500 ps-3'>          
              <ReactionButton />
        </div>
      </div>
    </div>
  )
}

export default TopicComment