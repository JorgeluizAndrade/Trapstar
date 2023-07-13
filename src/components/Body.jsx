import React, { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
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
          track_number: track.track.number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinuteAndSecons = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 6000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number-1,
        },
        position_ms:0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if(response.status === 204){
      const currentPlaying ={
        id,name, artists,image
      }
      dispatch({type: reducerCases.SET_PLAYING, currentPlaying})
      dispatch({type: reducerCases.SET_PLAYER_STATE, playerState:true})
    } else dispatch ({type: reducerCases.SET_PLAYER_STATE, playerState:true})
  };

  return (
    <div headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="m-8 flex items-center gap-8 ">
            <div>
              <img
                src={selectedPlaylist.image}
                alt="Seelcted playlis"
                className="h-80 shadow-red-950/80"
              />
            </div>
            <div className="flex flex-col gap-4 text-red-100">
              <span className="text-4xl">PLAYLIST</span>
              <h1 className="text-amber-400 text-6xl">
                {selectedPlaylist.name}
              </h1>
              <p className="">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="">
            <div
              className={`grid grid-cols-[0.3fr,3fr,2fr,0.1fr] mt-4 text-gray-300 sticky top-15vh px-4 py-2 transition duration-300 ease-in-out ${
                headerBackground ? "bg-black bg-opacity-70" : "bg-none"
              }`}
            >
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
            <div className="mx-8 flex flex-col mb-20">
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
                      className="p-2 grid grid-cols-[0.3fr,3.1fr,2fr,0.1fr] rounded-2xl cursor-pointer hover:bg-neutral-950 hover:bg-opacity-70"
                      key={id}
                      onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}
                    >
                      <div className="flex items-center text-gray-300">
                        {index + 1}
                      </div>
                      <div className="flex items-center text-gray-300 ">
                        <div className="flex gap-12">
                          <img
                            src={image}
                            alt="Track"
                            className="h-[85px] w-[85px]"
                          />
                        </div>
                        <div className="flex m-7 flex-col text-orange-600">
                          <span className="gap-7">{name}</span>
                          <span className="gap-7 p-2">
                            {artists.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-orange-400">{album}</span>
                      </div>
                      <div>
                        <span className="text-orange-400">
                          {msToMinuteAndSecons(duration)}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
