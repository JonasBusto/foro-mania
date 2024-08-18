import { useAppDispatch, useAppSelector } from './store';
import {
  createTag,
  deleteTagById,
  getTagById,
  updateTagById,
} from '../store/tag/thunks';

export function useTagAction() {
  const tags = useAppSelector((state) => state.tag.tags);
  const tag = useAppSelector((state) => state.tag.category);
  const statusTag = useAppSelector((state) => state.tag.statusTag);
  const statusCreateTag = useAppSelector((state) => state.tag.statusCreate);
  const statusUpdateTag = useAppSelector((state) => state.tag.statusUpdate);

  const dispatch = useAppDispatch();

  const getTag = async ({ id }) => {
    await dispatch(getTagById({ id }));
  };

  const addTag = async (tag) => {
    const res = await dispatch(createTag(tag));
    if (res.error) {
      alert('Error al cargar el tag');
    } else {
      alert('Tag creado');
    }
  };

  const updateTag = async ({ tag, id }) => {
    const res = await dispatch(updateTagById({ tag, id }));
    if (res.error) {
      alert('Error al cargar el tag');
    } else {
      alert('Tag actualizado');
    }
  };

  const deleteTag = async ({ id }) => {
    const res = await dispatch(deleteTagById({ id }));
    if (res.error) {
      alert('Error al eliminar el tag');
    }
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
  };
}
