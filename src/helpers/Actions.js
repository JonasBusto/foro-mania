import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { STATUS_SLICE_STORE, USER_REACTION } from './constants';

export const TimeToNow = (fecha) => {
  if (fecha) {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  } else {
    return false;
  }
};

export function userFullDataExtract(
  users,
  reactions,
  topics,
  statusReactions,
  TopicsGlobalStatus
) {
  return users.map((user) => {
    if (
      statusReactions === STATUS_SLICE_STORE.FULLFILLED &&
      TopicsGlobalStatus === STATUS_SLICE_STORE.FULLFILLED
    ) {
      const userReactions = reactions.filter(
        (reaction) => reaction.userId === user.uid
      );
      const userTopics = topics.filter((topic) => topic.userId === user.uid);

      const likesCount = userReactions.filter(
        (reaction) => reaction.type === USER_REACTION.LIKE
      ).length;
      const unlikesCount = userReactions.filter(
        (reaction) => reaction.type === USER_REACTION.DISLIKE
      ).length;
      const topicsCount = userTopics.length;

      return {
        ...user,
        likesGiven: likesCount,
        unlikesGiven: unlikesCount,
        topicsCount: topicsCount,
      };
    }

    return {
      ...user,
      likesGiven: '',
      unlikesGiven: '',
      topicsCount: '',
    };
  });
}

export function lastTopicExtract(currentUserId, topics, getAll) {
  const userTopics = topics.filter((topic) => topic.userId === currentUserId);

  if (userTopics.length > 0) {
    const sortedTopics = userTopics.sort((a, b) => {
      const dateA = parseISO(a.createdAt);
      const dateB = parseISO(b.createdAt);

      return dateB - dateA;
    });

    if (getAll) {
      return sortedTopics;
    }

    const releaseTopic = sortedTopics[0];

    return releaseTopic;
  } else {
    return false;
  }
}
