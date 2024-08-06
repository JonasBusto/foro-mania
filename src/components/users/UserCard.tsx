import React from "react"
import { useNavigate } from "react-router-dom";
import { lastTopicExtract } from "../../helpers/Actions";
import { es } from "date-fns/locale";
import { formatDistanceToNow, parseISO } from "date-fns";
import '../../styles/userCard.css'


const UserCard = ({currentUser, topics}) => {

    const { photoProfile, email, uid, fullName } = currentUser
    const username = fullName.split(' ')[0].toLowerCase()

    const navigate = useNavigate()

    const navigateToUserSummary = (id: string) => {
        navigate(`/users-view/${id}/summary`)
    }
    const navigateToTopic = (id: string) => {
        navigate(`/topic/${id}`)
    }

    const lastTopic = lastTopicExtract(currentUser, topics)

    const TimeToNow = (fecha) => {
        if (fecha) {
            const fechaISO = parseISO(fecha);
            return formatDistanceToNow(fechaISO, { locale: es });            
        }
        else{
            return false
        }
    };

    const topicDate = TimeToNow(lastTopic.createdAt)

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
            {
                lastTopic ? 
                <>
                    <span>Ultimo tópico creado: <strong className="cursor-pointer" onClick={() => navigateToTopic(lastTopic.id)}>{lastTopic.title}</strong></span>
                    <small>Hace {topicDate}</small>
                </>
                :
                <span>Todavía no ha creado ningún tópico</span>
            }
        </div>
    </div>

  )
}

export default UserCard