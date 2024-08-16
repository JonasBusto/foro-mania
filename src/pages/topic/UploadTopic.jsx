import { Formik } from 'formik';
import { useEffect } from 'react';
import { useTopicAction } from '../../hooks/useTopicAction';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { TextEditor } from '../../components/topic/TextEditor';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/items/Loader';

export const UploadTopic = () => {
	const { id } = useParams();

	const {
		topic,
		addTopic,
		updateTopic,
		statusTopic,
		getTopic,
		clearStateCategory,
		statusCreateTopic,
		statusUpdateTopic,
	} = useTopicAction();
	const { categories } = useCategoryAction();
	const { loggedUser } = useAuth();

	const labelStyle = 'text-white font-semibold mb-2';
	const inputStyle = 'h-8 px-3 outline-none ';
	const errorStyle = 'text-red-300 italic text-sm mt-1';

	let initialValues = {
		title: '',
		categoryId: '',
		content: '',
		userId: loggedUser.uid,
		isActive: true,
		createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
	};

	useEffect(() => {
		if (id) {
			getTopic(id);
		} else {
			clearStateCategory();
		}
	}, []);

	if (id && topic) {
		initialValues = {
			title: topic.title,
			categoryId: topic.categoryId,
			content: topic.content,
			userId: topic.userId,
			createdAt: topic.createdAt,
			isActive: true,
		};
	}

	if (statusTopic === 'Cargando') {
		return <Loader />;
	}

	return (
		<div className='bg-neutral-800 px-2 max-w-[80rem] mx-auto py-20'>
			<Formik
				initialValues={initialValues}
				validate={(values) => {
					let errors = {};

					if (values.title === '') {
						errors.title = 'Requerido';
					}

					if (values.categoryId === '') {
						errors.categoryId = 'Requerido';
					}

					if (values.content === '') {
						errors.content = 'Requerido';
					}

					return errors;
				}}
				onSubmit={(values) => {
					if (id && topic) {
						updateTopic({ topic: values, id });
					} else {
						addTopic(values);
					}
				}}>
				{({
					handleSubmit,
					errors,
					touched,
					values,
					handleChange,
					handleBlur,
					setFieldValue,
				}) => (
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-3 max-w-[60rem]  mx-auto'>
						<h1 className='text-center text-3xl font-bold text-neutral-200'>
							Nueva Publicación
						</h1>
						<div className='flex flex-col'>
							<label htmlFor='' className={labelStyle}>
								Titulo:
							</label>
							<input
								className={inputStyle}
								name='title'
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
								type='text'
							/>
							{touched.title && errors.title && (
								<p className={errorStyle}>{errors.title}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='' className={labelStyle}>
								Categoria:
							</label>
							<select
								className={inputStyle}
								name='categoryId'
								value={values.categoryId}
								onChange={handleChange}
								onBlur={handleBlur}>
								<option value=''>Seleccionar</option>
								{categories.map((category) => (
									<option key={category.uid} value={category.uid}>
										{category.title}
									</option>
								))}
							</select>
							{touched.categoryId && errors.categoryId && (
								<p className={errorStyle}>{errors.categoryId}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='' className={labelStyle}>
								Contenido:
							</label>
							<TextEditor
								value={values.content}
								onChange={(content) =>
									setFieldValue('content', content)
								}
							/>
							{touched.content && errors.content && (
								<p className={errorStyle}>{errors.content}</p>
							)}
						</div>
						<div className='text-end'>
							<button
								type='submit'
								disabled={
									statusCreateTopic === 'Cargando' ||
									statusUpdateTopic === 'Cargando'
								}
								className='bg-blue-900 hover:bg-blue-800 text-white font-semibold duration-200 py-2 px-3 w-40'>
								{id
									? statusUpdateTopic === 'Cargando'
										? 'Cargando'
										: 'Cargar'
									: statusCreateTopic === 'Cargando'
										? 'Cargando'
										: 'Cargar'}
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};
