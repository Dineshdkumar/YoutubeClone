import {createStore,applyMiddleware, combineReducers} from 'redux'
import {thunk} from 'redux-thunk'
import { homeVideosReducer, searchVideosReducer } from './reducers/video.reducers'
import { selectedVideoReducer } from './reducers/video.reducers'
import { channelDetailsReducer } from './reducers/Channel.reducer'
import { commentListReducer } from './reducers/comment.reducer'


const rootReducer=combineReducers({
   homeVideos:  homeVideosReducer,
   selectedVideo:selectedVideoReducer,
   channelDetails:channelDetailsReducer,
   commentsList:commentListReducer,
   searchedVideos:searchVideosReducer
})
const store=createStore(rootReducer,{},applyMiddleware(thunk))
export default store;
