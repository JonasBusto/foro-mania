import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useUserAction } from "../../hooks/useUserAction";
import '../../styles/userCard.css'


const UserCard = ({userProps}) => {

    const { photoProfile, email, uid, fullName } = userProps
    const username = fullName.split(' ')[0].toLowerCase()

    const { getUser, user } = useUserAction()
    const navigate = useNavigate()


    const navigateToUserSummary = (name, id) => {

        getUser(id)
        // navigate(`/users-view/${name}/summary`)
    }
    

    useEffect(() => {
        console.log(user);
    }, [user])


  return (
    <div className="flex flex-col px-2 bg-black shadow-md rounded-md relative">
        <div className="flex">
            <figure className="myFigure">
                <img src={photoProfile}
                    onClick={() => navigateToUserSummary(username, uid)}
                    alt="foto de perfil del usuario" className="rounded-full ring-2 cursor-pointer"
                />
            </figure>

            <div className='flex flex-col ml-3 '>
                <h2 className="text-3xl text-white cursor-pointer"
                    onClick={() => navigateToUserSummary(username, uid)} 
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