import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export const UserReactions = ({ userProps, reactions, topics, users }) => {
  const { email, fullName, uid } = userProps;

  const likeReactions = reactions.filter(
    (reaction) => (reaction.type === 'like' && reaction.userId === uid)
  );

  const userLikeTopics = likeReactions.flatMap((reaction) => {
    return topics.filter((topic) => topic.uid === reaction.contentId)
  });

  console.log(users);
  console.log(userLikeTopics);
  
  

  const userWithLikedTopics = userLikeTopics.map((topic) => {
    const user = users.find((user) => user.uid === topic.userId)
    return { ...topic, user }    
  });

  const fechaCreacion = (fecha) => {
    const date = parseISO(fecha);
    return format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  };

  console.log(userWithLikedTopics);

  return (
    <>
      {userWithLikedTopics ? (
        userWithLikedTopics.map((topic) => (
          <Link
            key={topic.uid}
            to={`/topic/${topic.uid}`}
            className='flex items-start p-4 bg-[#1e1e1e] rounded-lg border-l-4 w-full'
          >
            <div className='flex items-center w-full'>
              <div className='flex flex-col flex-grow'>
                <small className='text-gray-400 leading-tight'>
                  {topic.user.fullName}
                </small>
                <h3 className='m-0 text-xl font-semibold text-white'>
                  {topic.title}
                </h3>
              </div>
              <div className='flex flex-col text-right text-gray-300'>
                <p className='text-sm'>{fechaCreacion(topic.createdAt)}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className='text-center'>Todavía no has publicado ningún tópico</p>
      )}
    </>
  );
};
