import axios from "axios";
import React, { createContext, useState, useContext, useCallback } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [open, setOpen] = useState("nav-active");
  const [videos, setVideos] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [page, setPage] = useState(1);
  const [playlistPage, setPlaylistPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasMorePlaylist, setHasMorePlaylist] = useState(true);
  const [adClicked, setAdClicked] = useState(0);

  // Get all videos
  const fetchVideos = useCallback(async () => {
    if (!hasMore) return;

    try {
      const res = await axios.get(
        `https://ourtubeapi-1-37sk.onrender.com/video/video?page=${page}&limit=8`
      );
      const data = await res.data;
      if (data.videos.length === 0) {
        setHasMore(false); // no more videos
      } else {
        setVideos((prev) => [...prev, ...data.videos]);
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }, [page, hasMore]);

  // Get all playlist
  const fetchPlaylist = useCallback(async () => {
    if (!hasMorePlaylist) return;

    try {
      const res = await axios.get(
        `https://ourtubeapi-1-37sk.onrender.com/playlist?page=${playlistPage}&limit=8`
      );
      const data = await res.data;
      console.log(data);
      if (data.length === 0) {
        setHasMorePlaylist(false); // no more videos
      } else {
        setPlaylist((prev) => [...prev, ...data]);
        setPlaylistPage((p) => p + 1);
      }
    } catch (err) {
      console.error("Error fetching playlist:", err);
    }
  }, [playlistPage, hasMorePlaylist]);

  return (
    <GlobalStateContext.Provider
      value={{
        open,
        setOpen,
        videos,
        playlist,
        hasMore,
        hasMorePlaylist,
        fetchVideos,
        fetchPlaylist,
        adClicked,
        setAdClicked,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// 3. Custom hook to access context
export const useGlobalState = () => useContext(GlobalStateContext);
