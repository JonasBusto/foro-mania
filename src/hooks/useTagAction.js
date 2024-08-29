import { useAppDispatch, useAppSelector } from './store';
import {
  createTag,
  deleteTagById,
  getTagById,
  updateTagById,
} from '../store/tag/thunks';
import { clearTag } from '../store/tag/slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useTagAction() {
  const tags = useAppSelector((state) => state.tag.tags);
  const tag = useAppSelector((state) => state.tag.tag);
  const statusTag = useAppSelector((state) => state.tag.statusTag);
  const statusCreateTag = useAppSelector((state) => state.tag.statusCreate);
  const statusUpdateTag = useAppSelector((state) => state.tag.statusUpdate);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTag = async ({ id }) => {
    await dispatch(getTagById({ id }));
  };

  const addTag = async (tag, redirect = false) => {
    const res = await dispatch(createTag(tag));
    if (res.error) {
      toast.error('Error al cargar el tag');
    } else {
      toast.info('Tag creado');
      if (redirect) {
        navigate('/tags');
      }
    }
  };

  const updateTag = async ({ tag, id }) => {
    const res = await dispatch(updateTagById({ tag, id }));
    if (res.error) {
      toast.error('Error al cargar el tag');
    } else {
      toast.info('Tag actualizado');

      navigate('/tags');
    }
  };

  const deleteTag = async ({ id }) => {
    const res = await dispatch(deleteTagById({ id }));
    if (res.error) {
      toast.error('Error al eliminar el tag');
    }
  };

  const clearStateTag = () => {
    dispatch(clearTag());
  };

  return {
    tags,
    tag,
    statusTag,
    statusCreateTag,
    statusUpdateTag,
    getTag,
    addTag,
    updateTag,
    deleteTag,
    clearStateTag,
  };
}
