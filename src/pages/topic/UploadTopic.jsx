import { Formik } from 'formik'
import React from 'react'
import { useTopicAction } from '../../hooks/useTopicAction'
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';

const UploadTopic = () => {
    const { addTopic, statusCreateTopic } = useTopicAction();
    const { loggedUser } = useAuth();



    const labelStyle = 'text-white font-semibold mb-2'
    const inputStyle = 'h-8 px-3 outline-none '
    const errorStyle = 'text-red-300 italic text-sm mt-1'

    return (
        <div className='bg-neutral-800 px-2 max-w-[80rem] mx-auto py-20'>
            <Formik initialValues={{
                title: '',
                category: '',
                content: '',
                userId: loggedUser.uid,
                createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
            }}
                validate={(values) => {
                    let errors = {};
                    if (values.title === '') {
                        errors.title = 'No se ingresó el titulo'
                    }

                    if (values.category === '') {
                        errors.category = 'No se ingresó la categoria'
                    }

                    if (values.content === '') {
                        errors.content = 'No se ingresó conenido'
                    }
                    return errors
                }}

                onSubmit={(values) => {
                    addTopic(values)
                }
                }
            >
                {
                    ({ handleSubmit, errors, touched, values, handleChange, handleBlur }) => (

                        <form onSubmit={handleSubmit} className='flex flex-col gap-3 max-w-[60rem]  mx-auto'>
                            <h1 className='text-center text-3xl font-bold text-neutral-200'>Nueva Publicación</h1>
                            <div className='flex flex-col'>
                                <label htmlFor="" className={labelStyle}>Titulo:</label>
                                <input className={inputStyle} name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} type="text" />
                                {touched.title && errors.title && <p className={errorStyle}>{errors.title}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className={labelStyle}>Categoria:</label>
                                <select className={inputStyle} id="" name='category' value={values.category} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Seleccionar</option>
                                    <option value="humor">humor</option>
                                    <option value="ciencia">ciencia</option>
                                </select>
                                {touched.category && errors.category && <p className={errorStyle}>{errors.category}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className={labelStyle}>Contenido:</label>
                                <textarea className='resize-none h-60 outline-none p-3' id="" name='content' value={values.content} onChange={handleChange} onBlur={handleBlur}></textarea>
                                {touched.content && errors.content && <p className={errorStyle}>{errors.content}</p>}
                            </div>
                            <div className='text-end'>
                                <button type='submit' disabled={statusCreateTopic === 'Cargando'} className='bg-blue-900 hover:bg-blue-800 text-white font-semibold duration-200 py-2 px-3 w-40'>
                                    {statusCreateTopic === 'Cargando' ? 'Cargando...' : 'Cargar'}
                                </button>
                            </div>

                        </form>
                    )
                }

            </Formik>
        </div >
    )
}

export default UploadTopic