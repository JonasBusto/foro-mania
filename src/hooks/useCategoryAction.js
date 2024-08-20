import { useNavigate } from 'react-router-dom';
import { clearCategory } from '../store/category/slice';
import {
	createCategory,
	deleteCategoryById,
	getCategoryById,
	updateCategoryById,
	disableCategoryById,
	enableCategoryById,
} from '../store/category/thunks';
import { useAppDispatch, useAppSelector } from './store';
import { toast } from 'react-toastify';

export function useCategoryAction() {
	const categories = useAppSelector((state) => state.category.categories);
	const category = useAppSelector((state) => state.category.category);
	const statusCategory = useAppSelector(
		(state) => state.category.statusCategory
	);
	const statusCreateCategory = useAppSelector(
		(state) => state.category.statusCreate
	);
	const statusUpdateCategory = useAppSelector(
		(state) => state.category.statusUpdate
	);

	const statusActiveCategory = useAppSelector(
		(state) => state.category.statusActive
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const getCategory = async ({ id }) => {
		await dispatch(getCategoryById({ id }));
	};

	const addCategory = async (category) => {
		const res = await dispatch(createCategory(category));
		if (res.error) {
			// alert('Error al cargar la categoria');
			toast.error('Error al cargar la categoria');
		} else {
			// alert('Categoria creada');
			toast.success('Categoria creada');
			navigate('/categories');
		}
	};

	const updateCategory = async ({ category, id }) => {
		const res = await dispatch(updateCategoryById({ category, id }));
		if (res.error) {
			// alert('Error al cargar la categoria');
			toast.error('Error al cargar la categoria');
		} else {
			// alert('Categoria actualizada');
			toast.success('Categoria actualizada');
			navigate('/categories');
		}
	};

	const disableCategory = async ({ id }) => {
		const res = await dispatch(disableCategoryById({ id }));
		if (res.error) {
			// alert('Error al inhabilitar la categoria');
			toast.error('Error al inhabilitar la categoria');
		}
	};

	const enableCategory = async ({ id }) => {
		const res = await dispatch(enableCategoryById({ id }));
		if (res.error) {
			// alert('Error al habilitar la categoria');
			toast.error('Error al habilitar la categoria');
		}
	};

	const deleteCategory = async ({ id }) => {
		const res = await dispatch(deleteCategoryById({ id }));
		if (res.error) {
			// alert('Error al eliminar la categoria');
			toast.error('Error al eliminar la categoria')
		}
	};

	const clearStateCategory = () => {
		dispatch(clearCategory());
	};

	return {
		categories,
		category,
		clearStateCategory,
		statusCreateCategory,
		statusUpdateCategory,
		getCategory,
		addCategory,
		updateCategory,
		statusCategory,
		deleteCategory,
		disableCategory,
		enableCategory,
		statusActiveCategory,
	};
}
