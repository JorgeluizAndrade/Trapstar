import React from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlayerControl() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeTrack = async (type) => {
    const isPremiumAccount = () => {
      return false;
    };

    if (isPremiumAccount()) {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } else {
      alert("You need to have a premium Spotify account to trade songs.");
    }

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
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
    } else dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
  };

  const changeState = async () => {
    const isPremiumAccount = () => {
      return false;
    }
    const state = playerState ? "pause" : "play";
    if (isPremiumAccount()) {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } else {
      alert("You need to have a premium Spotify account to trade songs.");
    }
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState:!playerState });
  };

  return (
    <div className="text-center grid grid-cols-7 pt-9">
      <div className="pt-2">
        <BsShuffle className="text-white ease-in-out duration-200 cursor-pointer  hover:text-gray-500" />
      </div>
      <div className="text-3xl">
        <CgPlayTrackPrev
          onClick={() => changeTrack("previous")}
          className="text-white ease-in-out duration-200 cursor-pointer hover:text-gray-500"
        />
      </div>
      <div className="text-3xl">
        {playerState ? (
          <BsFillPauseCircleFill className="text-white ease-in-out duration-200 cursor-pointer hover:text-gray-500" onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill className="text-white ease-in-out duration-200 cursor-pointer hover:text-gray-500" onClick={changeState} />
        )}
      </div>
      <div className="text-3xl">
        <CgPlayTrackNext
          onClick={() => changeTrack("next")}
          className="text-white ease-in-out duration-200 cursor-pointer hover:text-gray-500"
        />
      </div>
      <div className="pt-2">
        <FiRepeat className="text-white ease-in-out duration-200 cursor-pointer hover:text-gray-500" />
      </div>
    </div>
  );
}
