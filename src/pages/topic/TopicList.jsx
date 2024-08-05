import React from 'react'
import { CategoryMenu } from '../../components/home/CategoryMenu'
import { useTopicAction } from '../../hooks/useTopicAction'
import TopicListTopic from './TopicListTopic'
import { useLocation } from 'react-router-dom'
import banner1 from '/img/banner1.gif'

const TopicList = () => {
    const { topics } = useTopicAction();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const queryCategory = query.get('category');
    const querySearch = query.get('search');

    let filteredTopics = topics;

    if (queryCategory) {
        filteredTopics = filteredTopics.filter(item => item.categoryId === queryCategory);
    }

    if (querySearch) {
        filteredTopics = filteredTopics.filter(item => item.title.toLowerCase().includes(querySearch.toLowerCase()));
    }

    return (
        <div className='bg-neutral-800 py-10 text-neutral-200 px-3 '>
            <div className='max-w-[75rem] mx-auto'>
                <div className='bg-white w-full h-28 flex items-center justify-center'>
                    <img src={banner1} alt='img-adversiting' className='h-full' />
                </div>
                <div>
                    <div className='my-6'>
                        <CategoryMenu />
                    </div>
                    <div>
                        <div className='flex text-center border-b-2 border-neutral-500 text-sm align-middle leading-4 pb-4 mb-6'>
                            <p className='w-7/12 text-start'>Titulo</p>
                            <p className='w-3/12'>Usuarios</p>
                            <p className='w-1/12'>Respuestas</p>
                            <p className='w-1/12'>Actividad</p>
                        </div>
                        {
                            filteredTopics.length > 0 ? (
                                filteredTopics.map((item, i) => (
                                    <TopicListTopic topic={item} key={i} />
                                ))
                            ) : (
                                <p>No se encontraron temas.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopicList;
