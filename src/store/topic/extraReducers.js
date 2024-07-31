import { createTopic, getTopicById } from "./thunks"

export const topicExtraReducers = (builder) => {
    builder
        .addCase(createTopic.pending, (state) => {
            state.statusCreate = 'Cargando'
        })
        .addCase(createTopic.fulfilled, (state, action) => {
            state.statusCreate = 'Exitoso'
            state.topics = [...state.topics, action.payload]
        })
        .addCase(createTopic.rejected, (state, action) => {
            state.statusCreate = 'Fallido'
            state.error = action.payload
        })
    builder
        .addCase(getTopicById.pending, (state) => {
            state.statusTopic = 'Cargando'
        })
        .addCase(getTopicById.fulfilled, (state, action) => {
            state.statusTopic = 'Exitoso'
            state.topic = action.payload
        })
        .addCase(getTopicById.rejected, (state, action) => {
            state.statusTopic = 'Fallido'
            state.error = action.payload
        })
}