import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("https://ourtubeapi-1-37sk.onrender.com/user/login", {
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data._id);
        localStorage.setItem("channelName", res.data.channelName);
        localStorage.setItem("logoUrl", res.data.logoUrl);
        // window.location.replace("/dashboard");
        navigate("/");
        window.location.reload();
        toast("Login successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="login-wrapper">
      <div className="wrapper-header">
        <img
          className="logo-image"
          src={require("../../assets/logo.png")}
          alt="logo"
        />
        <h2 className="c-name">Our Tube</h2>
      </div>

      <form className="form-wrapper" onSubmit={submitHandler}>
        <input
          disabled={loading}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />

        <input
          disabled={loading}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button disabled={loading} type="submit">
          {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
          Submit
        </button>
        {/* <Link disabled={loading} className="link" to="/signup">
          Create a new account
        </Link> */}
      </form>
    </div>
  );
};

export default Login;
