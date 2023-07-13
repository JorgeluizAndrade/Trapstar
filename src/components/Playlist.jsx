import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { AiFillStar } from 'react-icons/ai'

export default function Playlist() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists?limit=8",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type:reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type:reducerCases.SET_PLAYLIST_ID, selectedPlaylistId  });
  }

  return (
    <div>
      <ul className="text-white m-4 list-none flex flex-col gap-4">
        {playlists.map(({ name, id }) => {
          return <li key={id} onClick={() => changeCurrentPlaylist(id)} className="flex items-center gap-2 cursor-pointer ease-in-out duration-200 hover:text-amber-500 sm:text-xs">
           <span className="text-amber-400"> <AiFillStar/> </span> 
            {name}
          </li>;
        })}
      </ul>
    </div>
  );
}
