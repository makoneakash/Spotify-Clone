import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { useState } from "react";

export const Navbar=({navbackground})=>{
    
    const [{userInfo,isLogout},dispatch] = useStateProvider();
    
    return(
     <Container navbackground={navbackground}>
      
        <div className="avtar">
          <a href="#">
            <CgProfile/>
            <span>{userInfo?.userName}</span>
          </a>
        </div>
        <div className="search_bar">
       <FaSearch/>
       <input type="text" placeholder="artists,songs,or podcasts"/> 
        </div>
     </Container>
    );
    }

    const Container = styled.div`    
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:2rem;
      height:15vh;
      position:sticky;
      top:0;
      transition:0.3s ease-in-out;
      background-color:${({navbackground})=>
        navbackground ? "rgba(0,0,0,0.7)" :"none"};
       
      .search_bar{
        background-color:white;
        width:30%;
        padding:0.4rem 1rem;
        border-radius:2rem;
        display:flex;
        align-items:center;
        gap:0.5rem;
        input{
          border:none;
          height:2rem;
          width:100%;
          &:focus{
            outline:none;
          }
        } 
       }

       .avtar{
         
          background-color:black;
          padding:0.3rem 0.4rem;
          padding-right:1rem;
          border-radius:2rem;
          display:flex;
          justify-content:center;
          align-items:center;
          a{
            display:flex;
            justify-content:center;
            align-items:center;
            gap:0.5rem;
            text-decoration:none;
            color:white;
            font-weight:bold;
            svg{
              font-size:1.3rem;
              background-color:transparent;
              padding:0.2rem;
              border-radius:1rem;
              color:#c7c5c5;
            }
          }
       }

       .logout{
          button{
            background-color:black;
            color:white;
            border-radius : 0.5rem;
            padding : 5px;
          }
       }

   @media(max-width:738px)
    {
      display:flex;
      flex-direction:column;
      align-items:center;
      padding-top:10px ;
      .search_bar{
      width:90%;
      height:2rem;
      }
      .avtar{
      height:1.8rem;
      }

    }
    `;
  


