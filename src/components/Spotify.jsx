import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";


export const Spotify = ()=>{
  
const [{token,isLogout},dispatch] = useStateProvider();

const bodyRef = useRef();
    const [navbackground,setNavbackground] = useState(false);
    const [headerbackground,setHeaderbackground] = useState(false);
    const bodyScrolled = ()=>{
      
      bodyRef.current.scrollTop>=30
      ? setNavbackground(true)
      : setNavbackground(false);

      bodyRef.current.scrollTop>=268
      ? setHeaderbackground(true)
      : setHeaderbackground(false);
    }

useEffect( ()=>{

  const getUserInfo = async ()=>{
    const {data} = await axios.get("https://api.spotify.com/v1/me",{
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json",
              },
          });

          const userInfo = {
            userId:data.id,
            userName:data.display_name,
          };

          dispatch({
            type:reducerCases.SET_USER,
            userInfo:userInfo,
          });
  };
  getUserInfo();
},[dispatch,token]);


return (
<Container>
    <div className="spotify_body">
        <Sidebar/>
    <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
        <Navbar  navbackground={navbackground}/>
        <div className="body_contents">
            <Body headerbackground={headerbackground}/>
        </div>
    </div>
   </div>
   <div className="spotify_footer">
    <Footer/>
   </div>
</Container>
  )
}

const Container = styled.div`
max-width:100vw;
max-height:100vh;
overflow:hidden;
display:grid;
grid-template-rows:85vh 15vh;
.spotify_body{
@media(max-width:738px)
      {
        grid-template-columns:20vw 80vw;

      }
display:grid;
grid-template-columns:15vw 85vw;
height:100%;
width:100%;
background:linear-gradient(transparent,rgba(0,0,0,1));
background-color:rgba(32,87,100);
      .body{
        height:100%;
        width:100%;
        overflow:auto;
        &::-webkit-scrollbar{
          width:0.7rem;
          max-height:2rem;
          &-thumb{
            background-color:rgba(255,255,255,0.6);
          }
        }
          @media(max-width:738px){
          &::-webkit-scrollbar{
          width:1rem;
          background-color:gray;
          }         
          }
      }

}




`;
