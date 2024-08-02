import React from "react"
import { useNavigate } from "react-router-dom";
import '../../styles/userCard.css'


const UserCard = ({userProps}) => {

    const { photoProfile, email, uid, fullName } = userProps
    const username = fullName.split(' ')[0].toLowerCase()

    const navigate = useNavigate()

    const navigateToUserSummary = (id) => {

        navigate(`/users-view/${id}/summary`)
    }


  return (
    <div className="flex flex-col px-4 relative rounded-md"
        style={{backgroundColor: 'rgba(0,0,0,.9)',filter: 'drop-shadow(0 0 6px #61dafb)'}}>
        <div className="flex">
            <figure className="myFigure">
                <img src={photoProfile}
                    onClick={() => navigateToUserSummary(uid)}
                    alt="foto de perfil del usuario" className="rounded-full ring-2 cursor-pointer"
                />
            </figure>

            <div className='flex flex-col ml-3 '>
                <h2 className="text-3xl text-white cursor-pointer"
                    onClick={() => navigateToUserSummary(uid)} 
                >
                    @{username}
                </h2>
                <span className="text-white">
                    {email}
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