import {
  createTopic,
  deleteTopicById,
  getTopicById,
  getTopics,
  updateTopicById,
} from './thunks';

export const topicExtraReducers = (builder) => {
  builder
    .addCase(createTopic.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createTopic.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      state.topics = [...state.topics, action.payload];
    })
    .addCase(createTopic.rejected, (state, action) => {
      state.statusCreate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getTopicById.pending, (state) => {
      state.statusTopic = 'Cargando';
    })
    .addCase(getTopicById.fulfilled, (state, action) => {
      state.statusTopic = 'Exitoso';
      state.topic = action.payload;
    })
    .addCase(getTopicById.rejected, (state, action) => {
      state.statusTopic = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getTopics.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getTopics.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.topics = action.payload;
    })
    .addCase(getTopics.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(updateTopicById.pending, (state) => {
      state.statusUpdate = 'Cargando';
    })
    .addCase(updateTopicById.fulfilled, (state, action) => {
      state.statusUpdate = 'Exitoso';
      state.topics = state.topics.map((topic) =>
        topic.uid === action.payload.uid ? action.payload : topic
      );
    })
    .addCase(updateTopicById.rejected, (state, action) => {
      state.statusUpdate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(deleteTopicById.pending, (state) => {
      state.statusDelete = 'Cargando';
    })
    .addCase(deleteTopicById.fulfilled, (state, action) => {
      state.statusDelete = 'Exitoso';
      state.topics = state.topics.filter(
        (topic) => topic.uid !== action.payload
      );
    })
    .addCase(deleteTopicById.rejected, (state, action) => {
      state.statusDelete = 'Fallido';
      state.error = action.payload;
    });
};
