import React from "react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlist from "./Playlist";

export default function Sidebar() {
  return (
    <div className="bg-black flex flex-col h-screen w-full">
      <div className="flex flex-col">
        <div className="text-3xl text-white cursor-pointer text-center m-4 ease-in-out duration-300 hover:text-zinc-900 sm:text-xl">
          <h1>TRAPSTAR</h1>
        </div>
      <ul className="text-white m-4 list-none flex flex-col gap-4 p-2">
        <li className="flex  items-center gap-2 cursor-pointer ease-in-out duration-200 hover:text-gray-700 ">
        <MdHomeFilled/>
          <span>Home</span>
        </li>
        <li className="flex  items-center gap-2 cursor-pointer ease-in-out duration-200 hover:text-gray-700 ">
        <MdSearch/>
          <span>Search</span>
        </li>
        <li className="flex  items-center gap-2 cursor-pointer ease-in-out duration-200 hover:text-gray-700 ">
        <IoLibrary/>
          <span>Library</span>
        </li>
      </ul>
      </div>
      <Playlist />
    </div>
  );
}
