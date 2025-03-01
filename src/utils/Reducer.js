
import { reducerCases } from "./Constants";

export const initialState = {
 token:null, //token for login
 playlists:[], //playlists for sidebar-playlist.jsx for playlist 
 userInfo:null, //for navbar userinformation
 selectedPlaylistsId:"0FEJ0ayiB1LUoTVCcm4wTU", //for temp selectedPlaylistId for body.jsx 
 selectedPlaylist:null, //information of playlist for body.jsx
 currentlyPlaying:{
  id:"0tgVpDi06FyKpA1z0VMD4v",
  name:"Perfect",
  artists:[ "Ed Sheeran"],
  image:"https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96",
}, //for footer , for updating currentplaying in body.jsx - playtrack , in currentTrack for display
 playerState:false, //for play pause in footer
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYING:   //
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:   //
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistsId: action.selectedPlaylistsId,
      };
      
    default:
      return state;
  }
};

export default reducer;
