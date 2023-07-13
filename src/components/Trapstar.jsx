import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Trapstar() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 300
      ? setHeaderBackground(false)
      : setHeaderBackground(true);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <div className="max-w-full max-h-screen overflow-hidden grid grid-rows-[85vh,15vh]">
      <div className="grid grid-cols-[15vw,85vw] h-screen w-full bg-gradient-to-r from-red-900 via-black to-red-950">
        <Sidebar />
        <div
          className="h-screen w-full overflow-auto .scrollbar::-webkit-scrollbar { width: 0.7rem; max-height: 2rem ;} .scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6)
  }"
          ref={bodyRef}
          onScroll={bodyScrolled}
        >
          <Navbar navBackground={navBackground} />
          <div>
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
