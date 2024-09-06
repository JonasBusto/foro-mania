import { useNavigate } from 'react-router-dom';
import {
  createTopic,
  deleteTopicById,
  getTopicById,
  updateTopicById,
  disableTopicById,
  enableTopicById,
} from '../store/topic/thunks';
import { useAppDispatch, useAppSelector } from './store';
import { clearCategory } from '../store/category/slice';
import { toast } from 'react-toastify';

export function useTopicAction() {
  const navigate = useNavigate();
  const topics = useAppSelector((state) => state.topic.topics);
  const topic = useAppSelector((state) => state.topic.topic);
  const TopicsGlobalStatus = useAppSelector((state) => state.topic.status);
  const statusCreateTopic = useAppSelector((state) => state.topic.statusCreate);
  const statusUpdateTopic = useAppSelector((state) => state.topic.statusUpdate);
  const statusDeleteTopic = useAppSelector((state) => state.topic.statusDelete);
  const statusActiveTopic = useAppSelector((state) => state.topic.statusActive);

  const statusTopic = useAppSelector((state) => state.topic.statusTopic);
  const dispatch = useAppDispatch();

  const addTopic = async (topic) => {
    const res = await dispatch(createTopic(topic));
    if (res.error) {
      toast.error('Hubo un error al cargar');
    } else {
      toast.success('Nuevo tema cargado!');

      navigate(`/topic/${res.payload.uid}`);
    }
  };

  const updateTopic = async ({ topic, id }) => {
    const res = await dispatch(updateTopicById({ topic, id }));
    if (res.error) {
      toast.error('Error al cargar la publicación');
    } else {
      toast.success('Publicación actualizada!');
      navigate(`/topic/${res.payload.uid}`);
    }
  };

  const disableTopic = async ({ id }) => {
    const res = await dispatch(disableTopicById({ id }));
    toast.success('Publicacion suspendida correctamente');

    if (res.error) {
      toast.error('Error al suspender la publiacion');
    }
  };

  const enableTopic = async ({ id }) => {
    const res = await dispatch(enableTopicById({ id }));
    toast.success('Publicacion habilitada correctamente');
    if (res.error) {
      toast.error('Error al habilitar la publicacion');
    }
  };

  const deleteTopic = async ({ id }) => {
    const res = await dispatch(deleteTopicById({ id }));

    if (res.error) {
      toast.error('Error al eliminar la categoria');
    } else {
      toast.success('Publicación eliminada correctamente');
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
    TopicsGlobalStatus,
    statusCreateTopic,
    statusUpdateTopic,
    statusDeleteTopic,
    statusActiveTopic,
    getTopic,
    clearStateCategory,
    topic,
    statusTopic,
    topics,
    disableTopic,
    enableTopic,
  };
}
