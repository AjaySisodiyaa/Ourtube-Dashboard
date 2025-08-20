import React from "react";
import "./PlayList.css";
import PlaylistItem from "../../components/Playlist/PlaylistItem";

const Playlist = () => {
  return (
    <div>
      <div className="playlist-container">
        <PlaylistItem />
      </div>
    </div>
  );
};

export default Playlist;
