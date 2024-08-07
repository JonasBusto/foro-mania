import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCommentAction } from '../../hooks/useCommentAction';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUserAction } from '../../hooks/useUserAction';
import { useCategoryAction } from '../../hooks/useCategoryAction';

const TopicListTopic = ({ topic, type = '' }) => {
    const { allComments, fetchComments } = useCommentAction();
    const { users } = useUserAction();
    const { categories } = useCategoryAction();

    const userFiltered = users.find((item) => item.uid === topic.userId);
    const categorieFiltered = categories.find((item) => item.uid === topic.categoryId);


    useEffect(() => {
        fetchComments()
    }, [])

    const filteredComments = allComments.filter(item => item.topicId === topic.id)

    const mostRecentComment = filteredComments.reduce((latest, comment) => {
        return new Date(comment.createdAt) > new Date(latest.createdAt) ? comment : latest;
    }, filteredComments[0] || { createdAt: topic.createdAt });

    const TimeToNow = (fecha) => {
        if (!fecha) return 'No comments';
        const fechaISO = parseISO(fecha);
        const distancia = formatDistanceToNow(fechaISO, { locale: es });
        if (distancia.includes('de')) return distancia.split(' de ')[1];
        return distancia;
    };




    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };





    return (
        <>
            {
                type === 'home' ?
                    <Link
                        to={`/topic/${topic.id}`}
                        className='flex items-start p-4 bg-[#1e1e1e] rounded-lg border-l-4'
                        style={{ borderLeft: `10px solid ${categorieFiltered.color}` }}
                    >
                        <div className='flex items-center w-full'>
                            {/* {tag.img && (
                                <img
                                    // src={tag.img}
                                    alt='Tag'
                                    width={40}
                                    className='mr-4 rounded-full w-14 h-14 object-cover'
                                />
                            )} */}
                            <div className='flex flex-col flex-grow'>
                                <p className='text-gray-400 text-[9px] leading-tight'>
                                    {`${userFiltered.fullName} (${userFiltered.email})`}
                                </p>
                                <h3 className='m-0 text-xl font-semibold text-white'>
                                    {topic.title}
                                </h3>
                                <div className='flex items-center mt-2 text-gray-400'>
                                    <div className={'w-3 h-3 rounded-full ' + topic.color}></div>
                                    <p className='text-sm ml-2'>{topic.category}</p>
                                </div>
                            </div>
                            <div className='flex flex-col text-right text-gray-300'>
                                <p className='text-sm'>{filteredComments.length} respuestas</p>
                                <p className='text-sm'>Actualizado hace {TimeToNow(mostRecentComment.createdAt)}</p>
                            </div>
                        </div>
                    </Link>
                    :
                    <div className='flex flex-col md:flex-row text-center border-b border-neutral-500 pb-3 mb-3'>
                        <Link to={`/topic/${topic.id}`} className='md:w-10/12 text-start'>
                            <h2 className='text-lg font-semibold mb-1'>{topic.title}</h2>
                            <p className='leading-5'>{stripHtmlTags(topic.content.slice(0, 150))} <span className='text-neutral-500'>...Leer Mas</span> </p>
                        </Link>
                        <div className='md:w-2/12 flex mt-3 md:mt-0 leading-3'>
                            <div className='w-1/2 flex items-center justify-center flex-col'>
                                <p>{filteredComments.length}</p>
                                <p className='md:hidden text-sm'>Comentarios</p>
                            </div>
                            <div className='w-1/2 flex items-center justify-center flex-col'>
                                <p className='text-sm'>{TimeToNow(mostRecentComment.createdAt)}</p>
                                <p className='md:hidden text-sm'>Actualizado</p>
                            </div>
                        </div>
                    </div>

            }



        </>
    )
}

export default TopicListTopic