import React, { useEffect } from 'react';
import { CategoryMenu } from '../../components/home/CategoryMenu';
import { useTopicAction } from '../../hooks/useTopicAction';
import TopicListTopic from './TopicListTopic';
import { useLocation } from 'react-router-dom';
import { useReactionAction } from '../../hooks/useReactionAction';
import { useLoad } from '../../hooks/useLoad';
import { BannerAdversiting } from '../../components/items/BannerAdversiting';
import Loader from '../../utils/Loader';

const TopicList = () => {
  const { topics, clearStateCategory } = useTopicAction();
  const { reactions } = useReactionAction();
  const { isLoading } = useLoad();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const queryCategory = query.get('category');
  const querySearch = query.get('search');
  const queryOrder = query.get('orderBy');

  let filteredTopics = [...topics];

  const countLikes = (topicId) => {
    return reactions.filter(
      (reaction) => reaction.contentId === topicId && reaction.type === 'like'
    ).length;
  };

  useEffect(() => {
    clearStateCategory();
  }, [topics]);

  if (queryCategory) {
    filteredTopics = filteredTopics.filter(
      (item) => item.categoryId === queryCategory
    );
  }

  if (querySearch) {
    filteredTopics = filteredTopics.filter((item) =>
      item.title.toLowerCase().includes(querySearch.toLowerCase())
    );
  }

  if (queryOrder) {
    if (queryOrder === 'last') {
      filteredTopics.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (queryOrder === 'top') {
      filteredTopics = filteredTopics.map((topic) => ({
        ...topic,
        likesCount: countLikes(topic.id),
      }));
      filteredTopics.sort((a, b) => b.likesCount - a.likesCount);
      filteredTopics = filteredTopics.map(({ likesCount, ...rest }) => rest);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='bg-neutral-800 py-10 text-neutral-200 px-3'>
      <div className='max-w-[75rem] mx-auto'>
        <BannerAdversiting />
        <div>
          <div className='my-6'>
            <CategoryMenu />
          </div>
          <div>
            <div className='hidden md:flex text-center border-b-2 border-neutral-500 align-middle leading-4 pb-4 mb-6'>
              <p className='w-7/12 text-start'>Titulo</p>
              <p className='w-3/12 text-start'>Usuarios</p>
              <p className='w-1/12'>Respuestas</p>
              <p className='w-1/12'>Actividad</p>
            </div>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((item, i) => (
                <TopicListTopic topic={item} key={i} />
              ))
            ) : (
              <p>No se encontraron temas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicList;
