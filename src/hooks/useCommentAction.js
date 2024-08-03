import { createComment, getComments } from '../store/comment/thunks';
import { useAppDisptach, useAppSelector } from './store';

export function useCommentAction() {
  const allComments = useAppSelector((state) => state.comment.comments);
  const statusCreateComment = useAppSelector(
    (state) => state.comment.statusCreate
  );
  const statusComment = useAppSelector((state) => state.comment.statusComment);

  const dispatch = useAppDisptach();

  const addComment = async (comment) => {
    const res = await dispatch(createComment(comment));
    if (res.error) {
      alert('Hubo un error al cargar');
    } else {
      alert('Comentario Cargado');
    }
  };

  const fetchComments = async (id) => {
    await dispatch(getComments(id));
  };
  return {
    addComment,
    fetchComments,
    statusComment,
    statusCreateComment,
    allComments,
  };
}
