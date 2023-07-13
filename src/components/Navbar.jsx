import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'


export default function Navbar({navBackground}) {
  const [{ userInfo }] = useStateProvider();
  return (
    <div className={`flex justify-between items-center p-8 h-15vh sticky top-0 transition duration-300 ${navBackground ? "bg-black bg-opacity-70" : "bg-none"}`}>
      <div className="bg-white w-1/3 p-1 rounded-3xl flex items-center gap-2 sm:ml-4">
        <FaSearch />
        <input type="text" placeholder="Artists or Songs " className="border-none h-6 w-full focus:outline-none" />
      </div>
      <div className="avatar bg-black p-1.5 pr-4 rounded-full flex justify-center items-center">
        <a href={userInfo?.userUrl} className="flex justify-center items-center gap-2 text-white font-bold">
          <CgProfile className="text-2xl bg-gray-800 p-0.5 rounded-full text-gray-300" />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  );
}
