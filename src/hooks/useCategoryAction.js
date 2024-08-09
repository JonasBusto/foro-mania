import { useNavigate } from 'react-router-dom';
import { clearCategory } from '../store/category/slice';
import {
  createCategory,
  deleteCategoryById,
  getCategoryById,
  updateCategoryById,
} from '../store/category/thunks';
import { useAppDispatch, useAppSelector } from './store';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getCategory = async ({ id }) => {
    await dispatch(getCategoryById({ id }));
  };

  const addCategory = async (category) => {
    const res = await dispatch(createCategory(category));
    if (res.error) {
      alert('Error al cargar la categoria');
    } else {
      alert('Categoria creada');
      navigate('/categories');
    }
  };

  const updateCategory = async ({ category, id }) => {
    const res = await dispatch(updateCategoryById({ category, id }));
    if (res.error) {
      alert('Error al cargar la categoria');
    } else {
      alert('Categoria actualizada');
      navigate('/categories');
    }
  };

  const deleteCategory = async ({ id }) => {
    const res = await dispatch(deleteCategoryById({ id }));
    if (res.error) {
      alert('Error al eliminar la categoria');
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
  };
}
