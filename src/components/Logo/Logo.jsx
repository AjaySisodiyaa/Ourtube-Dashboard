import { useNavigate } from "react-router-dom";
import "./Logo.css";

const Logo = ({ logoUrl, userId }) => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        className="profile-logo"
        src={logoUrl}
        onClick={() => navigate(`/profile/${userId}`)}
        alt=""
      />
    </div>
  );
};

export default Logo;
