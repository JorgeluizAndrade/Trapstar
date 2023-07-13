import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControl from "./PlayerControl";
import Volume from './Volume'

export default function Footer() {
  return (
    <div className="bg-gray-950 h-screen w-full border-t border-solid border-gray-700 grid grid-cols-[1fr,2fr,1fr] p-[0.5em]">
      <CurrentTrack /> 
      <PlayerControl />
      <Volume />
    </div>
  );
}
