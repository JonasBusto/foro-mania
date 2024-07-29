import React from "react"

const UserCard = ({user}) => {

  return (
    <div className="flex p-2 cursor-pointer">
        <div className="flex items-center justify-center">
            <img src="/fm-favicon.png" 
                alt="foto de perfil del usuario" className="rounded-full ring-2"
                style={{ width: '48px', height: '48px' }} 
            />
        </div>

        <div className='flex flex-col ml-3 self-center'>
            <h3>
                @{user.username}
            </h3>
            <span>
                {user.email}
            </span>
        </div>

    </div>
  )
}

export default UserCard