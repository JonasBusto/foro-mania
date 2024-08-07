import {
  createComment,
  deleteCommentById,
  getComments,
  updateCommentById,
} from '../store/comment/thunks';
import { useAppDisptach, useAppSelector } from './store';

export function useCommentAction() {
  const allComments = useAppSelector((state) => state.comment.comments);
  const statusCreateComment = useAppSelector(
    (state) => state.comment.statusCreate
  );
  const statusUpdateComment = useAppSelector(
    (state) => state.comment.statusUpdate
  );
  const statusDeleteComment = useAppSelector(
    (state) => state.comment.statusDelete
  );
  const statusComment = useAppSelector((state) => state.comment.statusComment);

  const dispatch = useAppDisptach();

  const addComment = async (comment, { resetForm }) => {
    const res = await dispatch(createComment(comment));
    if (res.error) {
      alert('Hubo un error al cargar comentario');
    } else {
      alert('Comentario Cargado');
      resetForm();
    }
  };

  const updateComment = async ({ comment, id }, { resetForm, setVisible }) => {
    const res = await dispatch(updateCommentById({ comment, id }));
    if (res.error) {
      alert('Hubo un error al cargar comentario');
    } else {
      alert('Comentario Actualizado');
      resetForm();
      setVisible(false);
    }
  };

  const deleteComment = async ({ id }, { setVisibleDelete }) => {
    const res = await dispatch(deleteCommentById({ id }));
    if (res.error) {
      alert('Error al eliminar el comentario');
    } else {
      alert('Comentario eliminado');
      setVisibleDelete(false);
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
    updateComment,
    statusUpdateComment,
    statusDeleteComment,
    deleteComment,
  };
}
