import React from "react";
import { AiFillFire } from "react-icons/ai";

export default function Login() {
  const handleClick = async () => {
    const apiUrl = "https://accounts.spotify.com/authorize";
    const clientId = "96e258c926bb43b98eae77d7c8e00adc";
    const redirectUri = "trapstar.vercel.app";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-library-modify",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "playlist-modify-private",
    ];
    const responseType = "token";
    const showDialog = true;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(" "),
      response_type: responseType,
      show_dialog: showDialog,
    });

    const authorizationUrl = `${apiUrl}?${params.toString()}`;
    window.location.href = authorizationUrl;
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen bg-black gap-20 ">
      <h1 className="text-white text-7xl ">TRAPSTAR</h1>
      <button
        className="p-4 bg-white rounded-3xl text-black  text-lg cursor-pointer border-none flex gap-2 text-center leading-none ease-in-out duration-300 hover:bg-black
         hover:text-white"
        onClick={handleClick}
      >
        Connect Trapstar With Your Spotify <AiFillFire />
      </button>
    </div>
  );
}
