
export function userFullDataExtract(users, reactions, topics, statusReactions, TopicsGlobalStatus) {
    
    return users.map(user => {
        if (statusReactions === 'Exitoso' && TopicsGlobalStatus === 'Exitoso') {
            const userReactions = reactions.filter(reaction =>
                reaction.userId === user.uid                
            );
            const userTopics = topics.filter(topic =>
                topic.userId === user.uid                
            );

            const likesCount = userReactions.filter(reaction => 
                reaction.type === 'like').length;
            const unlikesCount = userReactions.filter(reaction => 
                reaction.type === 'unlike').length;
            const topicsCount = userTopics.length;

            return {
                ...user,
                likesGiven: likesCount,
                unlikesGiven: unlikesCount,
                topicsCount: topicsCount
            };            
        }

        return {
            ...user,
            likesGiven: '',
            unlikesGiven: '',
            topicsCount: ''
        };
    });
}


export function lastTopicExtract(currentUser, topics) {

    const userTopics = topics.filter(topic =>
        topic.userId === currentUser.uid                
    )

    if (userTopics.length > 0) {
        const releaseTopic = userTopics.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        console.log(releaseTopic);
        return releaseTopic;
    }

    else {
        return false
    }

}