import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { TopicListTopic } from '../../pages/topic/TopicListTopic';

export const UserReactions = ({ userProps, reactions, topics, users }) => {
  const { email, fullName, uid } = userProps;

  const likeReactions = reactions.filter(
    (reaction) => reaction.type === 'like' && reaction.userId === uid
  );

  const userLikeTopics = likeReactions.flatMap((reaction) => {
    return topics.filter((topic) => topic.uid === reaction.contentId);
  });

  const userWithLikedTopics = userLikeTopics.map((topic) => {
    const user = users.find((user) => user.uid === topic.userId);
    return { ...topic, user };
  });

  const fechaCreacion = (fecha) => {
    const date = parseISO(fecha);
    return format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  };

  return (
    <>
      {userWithLikedTopics.length > 0 ? (
        userWithLikedTopics.map((topic) => (
          <TopicListTopic key={topic.uid} topic={topic} />
        ))
      ) : (
        <p className='text-center mt-6'>Sin publicaciones reaccionadas.</p>
      )}
    </>
  );
};
