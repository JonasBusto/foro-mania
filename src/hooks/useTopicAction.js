import { useNavigate } from 'react-router-dom';
import {
  createTopic,
  deleteTopicById,
  getTopicById,
  updateTopicById,
} from '../store/topic/thunks';
import { useAppDisptach, useAppSelector } from './store';
import { useEffect } from 'react';
import { clearCategory } from '../store/category/slice';

export function useTopicAction() {
  const navigate = useNavigate();
  const topics = useAppSelector((state) => state.topic.topics);
  const topic = useAppSelector((state) => state.topic.topic);
  const statusCreateTopic = useAppSelector((state) => state.topic.statusCreate);
  const statusUpdateTopic = useAppSelector((state) => state.topic.statusUpdate);
  const statusDeleteTopic = useAppSelector((state) => state.topic.statusDelete);
  const statusTopic = useAppSelector((state) => state.topic.statusTopic);
  const dispatch = useAppDisptach();

  const addTopic = async (topic) => {
    const res = await dispatch(createTopic(topic));
    if (res.error) {
      alert('Hubo un error al cargar');
    } else {
      alert('Nuevo tema cargado!');
      navigate(`/topic/${res.payload.uid}`);
    }
  };

  const updateTopic = async ({ topic, id }) => {
    const res = await dispatch(updateTopicById({ topic, id }));
    if (res.error) {
      alert('Error al cargar la publicación');
    } else {
      alert('Publicación actualizada');
      navigate(`/topic/${res.payload.uid}`);
    }
  };

  const deleteTopic = async ({ id }) => {
    const res = await dispatch(deleteTopicById({ id }));

    if (res.error) {
      alert('Error al eliminar la categoria');
    } else {
      alert('Publicación eliminada correctamente');
      navigate('/topic-list');
    }
  };

  const getTopic = async (id) => {
    await dispatch(getTopicById(id));
  };

  const clearStateCategory = () => {
    dispatch(clearCategory());
  };

  return {
    addTopic,
    updateTopic,
    deleteTopic,
    statusCreateTopic,
    statusUpdateTopic,
    statusDeleteTopic,
    getTopic,
    clearStateCategory,
    topic,
    statusTopic,
    topics,
  };
}