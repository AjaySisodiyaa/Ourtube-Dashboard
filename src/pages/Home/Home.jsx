import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [channelName, setChannelName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { profileId } = useParams();

  const getProfileById = useCallback(async () => {
    const response = await axios.get(
      `https://ourtubeapi-1-37sk.onrender.com/user/${profileId}`
    );
    setChannelName(response.data.user.channelName);
    setEmail(response.data.user.email);
    setPhone(response.data.user.phone);
    setImageUrl(response.data.user.logoUrl);
    console.log("ok");
  }, [profileId]);

  useEffect(() => {
    getProfileById();
  }, [getProfileById]);

  const fileHandler = (e) => {
    setLogo(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("email", email);
    formData.append("oldpassword", oldPassword);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("logo", logo);
    await axios
      .post(
        `https://ourtubeapi-1-37sk.onrender.com/user/${profileId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        window.localStorage.removeItem("logoUrl");
        window.localStorage.setItem("logoUrl", res.data?.user?.logoUrl);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="dashboard-home-wrapper">
      {/* <div className="wrapper-header">
        <img
          className="logo-image"
          src={require("../../assets/logo.png")}
          alt="logo"
        />
      </div> */}

      <form className="form-wrapper" onSubmit={submitHandler}>
        <input
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          type="text"
          placeholder="Channel Nmae"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone"
        />
        <input
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
          placeholder="Old Password"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input onChange={fileHandler} type="file" />
        {imageUrl !== "" && (
          <img className="preview-image" src={imageUrl} alt="logo-img" />
        )}
        <button type="submit">
          {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
