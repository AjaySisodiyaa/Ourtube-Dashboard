import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadVideo from "../../assets/upload-video.gif";
import uploadImage from "../../assets/upload-image.png";
import "./Upload.css";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const videoHandler = (e) => {
    setVideo(e.target.files[0]);
    setVideoUrl(URL.createObjectURL(e.target.files[0]));
  };
  const thumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);

      await axios.post(
        "https://ourtubeapi-1-37sk.onrender.com/video/upload",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setLoading(false);
      console.log("video uploaded");
      alert("Video uploaded");
    } catch (error) {
      alert("Video uploaded");
      setLoading(false);
      const message = error.response?.data?.error || "Upload failed";
      toast.error(message);
      console.error(message);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <div className="upload-container">
        <form onSubmit={submitHandler} className="upload-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
          ></textarea>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="series">Series</option>
            <option value="movie">Movie</option>
          </select>
          <textarea
            onChange={(e) => setTags(e.target.value)}
            name="tags"
            placeholder="Tags"
          ></textarea>
          <div className="upload-file-container">
            <label htmlFor="upload-video-label" className="upload-file">
              Select Video
              <img src={uploadVideo} alt="" />
            </label>
            <input
              id="upload-video-label"
              style={{ display: "none" }}
              type="file"
              accept="video/*"
              onChange={videoHandler}
            />

            <label htmlFor="thumbnail" className="upload-file">
              Select Thumbnail
              <img src={uploadImage} alt="" />
            </label>
            <input
              id="thumbnail"
              style={{ display: "none" }}
              onChange={thumbnailHandler}
              type="file"
            />
          </div>

          <button disabled={loading} type="submit">
            Upload Video
          </button>
          {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
          {/* 👇 Progress Bar */}
          {/* {loading && (
            <div className="progress-bar-wrapper" style={{ margin: "10px 0" }}>
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "#eee",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#4caf50",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              <p style={{ fontSize: "12px" }}>{progress}%</p>
            </div>
          )} */}
        </form>
        <div className="upload-video-content">
          {videoUrl && (
            <div>
              <video className="upload-video" controls src={videoUrl}></video>
            </div>
          )}

          {imageUrl && (
            <img className="upload-thumbnail" src={imageUrl} alt="thumbnail" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
