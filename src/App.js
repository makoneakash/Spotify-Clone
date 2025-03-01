import { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import {useStateProvider} from "./utils/StateProvider"
import { reducerCases } from './utils/Constants';
import { Spotify } from './components/Spotify.jsx';


function App() {

  const [{token},dispatch] = useStateProvider();

  useEffect (()=>{
    const hash = window.location.hash;
    if(hash)
    {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({type:reducerCases.SET_TOKEN,token});
    } 
 
  },[token,dispatch]);

        
  return (
    <div className="App">
      {
        
        token  ? <Spotify/>:<Login/>
                
      }
    </div>
  );
}

export default App;
