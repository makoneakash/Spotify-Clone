
    
import { useState } from "react";
import styled from "styled-components";

const handelClick = () => {
  const clientId = "1b2d2f6c8dd3425a81be4b0d08f8378d";
  const redirectUrl = "https://makoneakash.github.io/Spotify-Clone/";
  const apiUrl = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "user-library-read",
    "app-remote-control",
    "streaming",
    "user-read-playback-state",
    "user-library-read",
  ];
  window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
    " "
  )}&response_type=token&show_dailog=true`;
};

const Login = () => {
  return (
    <Container>
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png" alt="" />
      <button onClick={handelClick}>Connect Spotify</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;

  img {
    height: 20vh;
    max-width: 100%;
    object-fit: contain;
  }

  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #49f585;
    cursor: pointer;
  }

  /* Mobile responsiveness */
  @media (max-width: 738px) {
    gap: 3rem;

    img {
      height: 15vh;
    }

    button {
      padding: 1rem 3rem;
    }
  }

`;

export default Login;
