import React from 'react'

export const PublicProfileCard = ({userProps}) => {

    const { photoProfile, email, fullName } = userProps


  return (
    <>
        <figure >
            <img src={photoProfile}
                alt="foto de perfil del usuario"
                className='object-cover w-[120px] h-[120px] p-1 rounded-full ring-2 ring-[#61dafb]'
            />
        </figure>

        <section>
            <h2 className='text-4xl font-bold mt-2'>{fullName}</h2>
            <span className='text-lg text-gray-300'>{email}</span>
        </section>
    </>
  )
}
