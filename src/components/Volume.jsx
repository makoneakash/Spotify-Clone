import styled from "styled-components"
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

 

export const Volume = ()=>{
    const [{token}] = useStateProvider();
    const setVolume =async(e)=>{
        await axios.put(`https://api.spotify.com/v1/me/player/volume`,{ },{
           
            params:{
            volume_percent : parseInt(e.target.value),
        },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }, 
        }); 
    }
    
    return(<Container>
      <input type="range" min={0} max={100}  />
      {/* onMouseUp={(e=>setVolume(e))}  use it for updating volume */}
    </Container>);
}

const Container =styled.div`
    display:flex;
    justify-content:flex-end;
    align-content:center;
    input{
        width:15rem;
        border-radius:2rem;
        height:0.5rem;
    }
`;