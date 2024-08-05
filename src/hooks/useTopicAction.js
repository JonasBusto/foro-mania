import { useNavigate } from "react-router-dom"
import { createTopic, getTopicById } from "../store/topic/thunks"
import { useAppDisptach, useAppSelector } from "./store"
import { useEffect } from "react"


export function useTopicAction() {
    const navigate = useNavigate()
    const topics = useAppSelector((state) => state.topic.topics);
    const topic = useAppSelector((state) => state.topic.topic)
    const statusCreateTopic = useAppSelector((state) => state.topic.statusCreate)
    const statusTopic = useAppSelector((state) => state.topic.statusTopic)
    const dispatch = useAppDisptach()


    const addTopic = async (topic) => {
        const res = await dispatch(createTopic(topic))
        if (res.error) {
            alert('Hubo un error al cargar')
        } else {
            alert('Nuevo tema cargado!')
            navigate(`/topic/${res.payload.uid}`)
        }
    }

    const getTopic = async (id) => {
        await dispatch(getTopicById(id))
    }


    return { addTopic, statusCreateTopic, getTopic, topic, statusTopic, topics }


}