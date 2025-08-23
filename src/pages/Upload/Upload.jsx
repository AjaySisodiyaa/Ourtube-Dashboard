import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import uploadImage from "../../assets/upload-image.png";
import "./Upload.css";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  // const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [mainVideoUrl, setMainVideoUrl] = useState("");
  // const [progress, setProgress] = useState(0);
  // const [vUrl, setVUrl] = useState("");

  const navigate = useNavigate();

  // const videoHandler = (e) => {
  //   setVideo(e.target.files[0]);
  //   setVideoUrl(URL.createObjectURL(e.target.files[0]));
  // };
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
      formData.append("video", videoUrl);
      formData.append("thumbnail", thumbnail);

      const res = await axios.post(
        "https://ourtubeapi-1-37sk.onrender.com/video/upload",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setLoading(false);
      console.log(res.data);
      alert("Video uploaded");
    } catch (error) {
      alert("Video uploaded");
      setLoading(false);
      const message = error.response?.data?.error || "Upload failed";
      toast.error(message);
      console.error(message);
    }
  };

  const getVideos = async () => {
    if (!mainVideoUrl || !mainVideoUrl.startsWith("http")) {
      toast.error("Please enter a valid URL");
      return;
    }
    try {
      const { data } = await axios.post(
        `https://ourtubeapi-1-37sk.onrender.com/video/get-video-url`,
        { videoUrl: mainVideoUrl }
      );
      console.log("data-------------------------->", data);
      setVideoUrl(data.videoUrl);
    } catch (err) {
      console.error(err);
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
          <input
            type="text"
            onChange={(e) => setMainVideoUrl(e.target.value)}
            name="videoUrl"
            placeholder="videoUrl"
          />
          <div
            style={{
              cursor: "pointer",
              padding: "10px",
              color: "blue",
              backgroundColor: "white",
              textAlign: "center",
            }}
            onClick={getVideos}
          >
            get video
          </div>
          <div className="upload-file-container">
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
        </form>

        <div className="upload-video-content">
          {imageUrl && (
            <img className="upload-thumbnail" src={imageUrl} alt="thumbnail" />
          )}
        </div>
        {console.log("last video url --------->", videoUrl)}
        <div>
          {videoUrl && (
            <iframe
              id="ad-opener"
              title="ad-opener"
              src={videoUrl}
              height="150px"
              width="300px"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
