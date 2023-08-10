import {createSlice} from "@reduxjs/toolkit";

const initialState={
    posts:[],
}

export const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        setPostsReducer:(state,action) => {
            state.posts =action.payload;
        },
        addPostReducer:(state,action) => {
            state.posts =state.posts.unshift(action.payload);
        },
        deletePostReducer:(state,action) => {
            const idPostToDelete=action.payload;
            state.posts = state.posts.filter(post => post.id !== idPostToDelete);
        },
        loadMorePostReducer:(state,action) => {
            state.posts =[...state.posts, ...action.payload]
        },
        incrementLikesReducer:(state,action) => {
            const {userID, postID} = action.payload;
            state.posts = state.posts.map(post =>{
                if(post.id === postID){
                    post.numberOfLikes =+1;
                    post.likedBy.push(userID);
                }
                return post;
            })
        },
        decrementLikesReducer:(state,action) => {
            const {userID, postID} = action.payload;
            state.posts = state.posts.map(post =>{
                if(post.id === postID){
                    post.numberOfLikes =-1;
                    post.likedBy.push(userID);
                }
                return post;
            })
        }
         

    }
})

export const {
    setPostsReducer,
    addPostReducer,
    loadMorePostReducer,
    deletePostReducer,
    incrementLikesReducer,
    decrementLikesReducer,
} = postSlice.actions;

export default postSlice.reducer;