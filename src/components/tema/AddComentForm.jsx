import React, { useState, useRef } from 'react';

const AddComentForm = () => {
    const [comment, setComment] = useState('');

    return (
        <div className='border border-neutral-700'>
            <div className=''>
                <h3 className='text-lg my-4 ms-4 font-semibold'>Agrega un comentario:</h3>
            </div>
            <div className=' bg-neutral-700'>
                <button
                    type='button'
                    title='Agrega una imagen'
                    className='pi pi-image text-lg hover:bg-neutral-600 py-2 px-3 duration-200'
                ></button>
                <button
                    title='Agrega un emoji'
                    className='pi pi-face-smile text-lg hover:bg-neutral-600 py-2 px-3 duration-200 '></button>
            </div>
            <form action="">
                <textarea
                    value={comment}
                    className='w-full h-60 resize-none text-neutral-900 p-3 outline-none'
                ></textarea>
            </form>
            <div className='text-end p-2'>
                <button className='bg-blue-900 hover:bg-blue-800 duration-200 py-2 px-3'>Agregar comentario</button>
            </div>
        </div>
    );
};

export default AddComentForm;
