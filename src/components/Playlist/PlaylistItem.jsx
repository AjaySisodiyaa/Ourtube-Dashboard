import React, { useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../context/context";
import "./Playlist.css";
// import AdsterraBanner from "../Adsterra/AdsterraBanner";
import axios from "axios";
import { useState } from "react";

const Playlisy = () => {
  const { playlist, hasMorePlaylist, fetchPlaylist, setPlaylist } =
    useGlobalState();
  const loader = useRef(null); // ✅ keep loader local
  const [title, setTitle] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePlaylist) {
          fetchPlaylist();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current && observer) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMorePlaylist, fetchPlaylist]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:4000/playlist/create",
        { title },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      alert("Playlist is created successfully");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  //remove video from playlist
  const handleRemove = async (playlistId, videoId) => {
    try {
      const res = await axios.post(
        `https://ourtubeapi-1-37sk.onrender.com/playlist/remove-video/${playlistId}`,
        { video_id: videoId },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      // 🔥 Optimistically update local playlist
      window.location.reload();
      alert("Video removed from playlist successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        style={{ gap: "10px", display: "flex", marginBottom: "30px" }}
        className="created-playlist"
        onSubmit={handleSubmit}
      >
        <h1>Create Playlist</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add new Playlist"
        />
        <button type="submit">Create</button>
      </form>
      {playlist.map((playlist) => (
        <div key={playlist?._id} className="playlist-container">
          <div className="video-title">
            <h1 style={{ color: "white" }}>{playlist?.title}</h1>
          </div>
          <div className="playlist-slider">
            {playlist.video_id.map((video, index) => (
              <div className="playlist-link">
                <Link
                  key={`${playlist._id}-${video._id}-${index}`}
                  target="_blank"
                  onClick={() =>
                    window.location.replace(
                      `https://ourtube-luzh.onrender.com/video/${video?._id}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    className="playlist-thumbnail"
                    src={video?.thumbnailUrl}
                    alt={video?.title}
                  />
                </Link>
                <button onClick={() => handleRemove(playlist?._id, video?._id)}>
                  remove
                </button>
              </div>
            ))}
          </div>
          <div className="video-info">
            <Logo
              logoUrl={playlist?.user_id?.logoUrl}
              userId={playlist?.user_id?._id}
            />
          </div>
        </div>
      ))}
      {hasMorePlaylist && <div ref={loader} style={{ height: "50px" }} />}
    </div>
  );
};

export default Playlisy;
