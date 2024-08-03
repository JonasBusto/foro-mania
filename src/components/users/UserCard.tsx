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
    <div className="userCardContainer">
        <div className="brandContainer">
            <figure >
                <img src={photoProfile}
                    onClick={() => navigateToUserSummary(uid)}
                    alt="foto de perfil del usuario" className="rounded-full cursor-pointer"
                />
            </figure>

            <section>
                <h2 onClick={() => navigateToUserSummary(uid)}>
                    @{username}
                </h2>
                <span className="text-white">
                    {email}
                </span>
            </section>
        </div>

        <div className="userInfo">
            <p>userdata</p>
            <p>i</p>
        </div>
    </div>

  )
}

export default UserCard