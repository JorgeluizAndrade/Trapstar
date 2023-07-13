import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type:reducerCases.SET_PLAYING, currentPlaying });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <div>
      {currentPlaying && (
        <div className="flex items-center gap-4 ">
          <div className="items-center">
            <img src={currentPlaying.image} alt="Current Playing" className="h-24 pb-3"  />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white">{currentPlaying.name}</h4>
            <h6 className="text-amber-400">{currentPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </div>
  );
}
