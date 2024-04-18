import {
  HOME_VIDEO_FAIL,
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  SEARCH_VIDEOS_REQUEST,
  SEARCH_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
 
} from "../../actions/actionType";

export const homeVideosReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEO_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case HOME_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case HOME_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      }
      case SELECTED_VIDEO_SUCCESS:
        return {
            ...state,
            video:payload,
            loading:false,
        }
        case SELECTED_VIDEO_FAIL:
            return {
                ...state,
                error:payload,
                loading:false,
                video:null
            }
    default:
      return state;
  }
};



export const searchVideosReducer = (
  state = {
    loading: true,
    videos: null,
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SEARCH_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      }
      case SEARCH_VIDEOS_SUCCESS:
        return {
            ...state,
            videos:payload,
            loading:false,
        }
        case SEARCH_VIDEOS_FAIL:
            return {
                ...state,
                error:payload,
                loading:false,
              
            }
    default:
      return state;
  }
};
