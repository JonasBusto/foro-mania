import {
	createComment,
	deleteCommentById,
	getComments,
	updateCommentById,
	enableCommentById,
	disableCommentById,
} from '../store/comment/thunks';
import { useAppDispatch, useAppSelector } from './store';

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
	const statusActiveComment = useAppSelector(
		(state) => state.comment.statusActive
	);
	const statusComment = useAppSelector((state) => state.comment.statusComment);

	const dispatch = useAppDispatch();

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

	const disableComment = async ({ id }) => {
		const res = await dispatch(disableCommentById({ id }));
		alert('Comentario Suspendido');
		if (res.error) {
			alert('Error al suspender el comentario');
		}
	};

	const enableComment = async ({ id }) => {
		const res = await dispatch(enableCommentById({ id }));
		alert('Comentario Habilitado');
		if (res.error) {
			alert('Error al habilitar el comentario');
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
		disableComment,
		enableComment,
		statusActiveComment,
	};
}
