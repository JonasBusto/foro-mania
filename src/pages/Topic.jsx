import React from 'react'
import usuario1 from '/img/avatar_168725.png'
import ReactionButton from '../components/buttons/ReactionButton'
import AddComentForm from '../components/tema/AddComentForm'

const Topic = () => {
    return (
        <div className='bg-neutral-800 py-10 text-neutral-200 px-3 '>
            <div className='max-w-[75rem] mx-auto'>
                <div className='bg-white w-full h-28'>
                    <img src="#" alt="img-adversiting" />
                </div>
                {/* contenedor del topico */}
                <div>
                    <div className='border-b border-neutral-700 py-4'>
                        <h2 className='text-3xl font-semibold'>Nombre del Topic</h2>
                        <p className='text-neutral-400'>Nombre de banda</p>
                    </div>
                    <div className='py-3 flex justify-between'>
                        <div className='flex gap-4'>
                            <img src={usuario1} alt="Imagen de usuario" className='w-12 rounded-full' />
                            <h3 className='font-semibold text-lg'>Nassa777</h3>
                        </div>
                        <div>
                            <p>5h</p>
                        </div>
                    </div>
                    <div className='leading-loose'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dicta vel odio cupiditate tempore. Reiciendis sunt dolorem ducimus quo consequuntur nulla ipsam, fugit reprehenderit illo. Et facilis at fugiat fuga?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fuga pariatur iste nostrum aspernatur consequatur nobis, quibusdam repudiandae reprehenderit ab, in accusantium libero tenetur expedita! Reprehenderit deleniti veritatis totam soluta.
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, officia! Dolore nesciunt placeat, excepturi sed provident illum! Quo alias similique modi dolorem, nam et facilis commodi, officiis, quam corrupti eligendi?
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between border border-neutral-600 bg-neutral-700 px-4 py-2 md:items-center my-8'>
                        <div className='flex gap-4 mb-4 md:mb-0'>
                            <div className='text-center'>
                                <p className='text-lg'>5hs</p>
                                <p className='text-sm'>creado</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-lg'>3</p>
                                <p className='text-sm'>respuestas</p>
                            </div>
                        </div>
                        <div className='flex gap-3 ms-auto'>
                            <ReactionButton reaction='👍' />
                            <ReactionButton reaction='👎' />
                            <ReactionButton reaction='❤️' />
                            <ReactionButton reaction='😡' />
                            <button className='border-s border-neutral-600 flex items-center justify-center ps-4'>
                                <i className='pi pi-face-smile text-xl'></i>
                            </button>
                        </div>
                    </div>
                    <div className='py-4 w-[90%]'>
                        <div className=' italic border rounded-md py-6 px-4'>
                            <p>Todavía nadie ha hecho un comentario, puedes ser el primero...</p>
                        </div>
                    </div>
                    <AddComentForm />

                </div>

            </div>
        </div>
    )
}

export default Topic