import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../services/firebase";


export const getTopics = createAsyncThunk(
    'topic/getAll',
    async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'topics')))
        } catch (error) {
            console.log(error);
        }
    }

)

export const getTopicById = createAsyncThunk(
    'topic/getById',
    async (id) => { 
        try {
            const querySnapshot = await getDoc(doc(db, 'topics', id ))
            console.log(querySnapshot.data());
            if(querySnapshot.exists()) {
                return {uid: querySnapshot.id, ...querySnapshot.data()}
            }else {
                return null
            }
        } catch (error) {
            console.log(error);
        }
     }
)

export const createTopic = createAsyncThunk(
    'topic/create',
    async (topic, { rejectWithValue }) => {
        try {
            const res = await addDoc(collection(db, 'topics'), topic)
            const createdTopic = await getDoc(doc(db, 'topics', res.id))
            if (createdTopic.exists()) {
                return { uid: createdTopic.id, ...createdTopic.data() }
            } else {
                return null
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)