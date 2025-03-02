import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";

export const Body= ({headerbackground})=>{
  const [{ token, selectedPlaylist, selectedPlaylistsId}, dispatch] = useStateProvider();
  
  useEffect(() => {
    const getInitialPlaylist = async () => {
          
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistsId}`
       ,{
             headers:{
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json",
          },
       }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistsId]);
 
  const msToMinutes=(ms)=>{
    const minutes =Math.floor(ms/60000);
    const seconds =((ms%60000)/1000).toFixed(0);
    return minutes + ":" +(seconds < 10 ? "00" : + seconds);
  }

  const playTrack = async (id,name,artists,image,context_uri,track_number) =>{
     
    const response = await axios.put(`https://api.spotify.com/v1/me/player/play`,
     {
       context_uri,
       offset:{
        position:track_number-1, 
       },
       
       position_ms:0,
     },
     {
      headers:{
        "Content-Type":"application/json",  
        Authorization: `Bearer ${token}`,
      },
  }
  );
  
  if(response.status == 204 ){

    const currentlyPlaying = {
      id,
      name,
      artists,
      image,
    };

    dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying});
    dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});
  }else{
    dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});
  }

  };

  return (
    <Container headerbackground={headerbackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>

          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
           
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      // onClick={() =>
                      //   playTrack(
                      //     id,
                      //     name,
                      //     artists,
                      //     image,
                      //     context_uri,
                      //     track_number
                      //   )
                      // }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                     
                      <div className="colDetail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span className="artistName">{artists}</span>
                        </div>
                      </div>

                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutes(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }

  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.1fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerbackground }) =>
        headerbackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.4fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .colDetail{
          display: flex;
          gap: 1rem;
          .image{
           img{
              border-radius:10px;
           }
          }
          
          .info {
            display:flex;
            flex-direction:column;

            color:white;
            .name{

              }
              .artistName{
                font-size:0.9rem;
                color:rgb(186, 182, 182);
              }
          }
        }
      }
    }
  }

  @media(max-width:738px)
      {
        .playlist{
        .image{
        img{
          height:10rem;
        }
        }

        gap:1rem;
        .details{
        gap:0.5rem;
          .title{
          font-size:1rem;
          }
        }
      }
      
        .list{
          .header-row{
          margin-left:-20px;
          grid-template-columns: 1rem 3rem 1rem 1rem;
          gap:50px;

          }

          .tracks{
          margin:0.5rem 0.5rem;
          gap:10px;
          }

          .row{
           grid-template-columns:1rem 3rem 1rem 1rem;
           gap:5px;
          }

          .col{
          font-size:0.85rem;
          gap:10px;
          }

          .colDetail{
            gap:0.3rem;
            .name{
            font-size:0.9rem;
            }
            .artistName{
            font-size:0.20rem;
            }
            }

        }

        

      }
`;

