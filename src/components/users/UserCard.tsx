import React from "react"
import '../../styles/userCard.css'

const UserCard = ({user}) => {

    const usermane = user.fullName.split(' ')[0].toLowerCase()

  return (
    <div className="flex flex-col px-2 bg-black shadow-md rounded-md relative">
        <div className="flex">
            <figure className="myFigure">
                <img src={user.photoProfile}
                    alt="foto de perfil del usuario" className="rounded-full ring-2"
                />
            </figure>

            <div className='flex flex-col ml-3 '>
                <h2 className="text-3xl text-white">
                    @{usermane}
                </h2>
                <span className="text-white">
                    {user.email}
                </span>
            </div>
        </div>

        <div style={{position: 'absolute', bottom: '4px', left: '16px', width: '90%'}}
            className="flex justify-between"
        >
            <p className="text-white z-10">userdata</p>
            <p className="text-white z-10">i</p>
        </div>
    </div>

  )
}

export default UserCard